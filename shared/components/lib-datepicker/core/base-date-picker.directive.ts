import {
  Directive,
  HostListener,
  inject,
  ElementRef,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { NgControl } from "@angular/forms";
import { Subscription } from "rxjs";

@Directive()
export abstract class BaseDateInputDirective implements OnInit, OnDestroy {
  protected ngControl = inject(NgControl, { self: true });
  protected el = inject(ElementRef<HTMLInputElement>);
  private statusSub?: Subscription;

  ngOnInit() {
    this.statusSub = this.ngControl.control?.valueChanges.subscribe((value) => {
      this.syncVisualValue(value);
    });

    setTimeout(() => this.syncVisualValue(this.ngControl.control?.value));
  }

  ngOnDestroy() {
    this.statusSub?.unsubscribe();
  }

  @HostListener("input", ["$event"])
  onInput(event: any): void {
    let raw = event.target.value.replace(/\D/g, "");
    if (raw.length > 8) raw = raw.substring(0, 8);

    this.el.nativeElement.value = this.formatMask(raw);

    if (raw.length === 8) {
      const iso = this.convertToIso(raw);
      this.ngControl.control?.setValue(iso, { emitEvent: false });
    }
  }

  // Método para forçar a exibição correta
  protected syncVisualValue(value: any) {
    const formatted = this.formatDisplay(value);
    if (formatted) {
      requestAnimationFrame(() => {
        this.el.nativeElement.value = formatted;
      });
    }
  }

  protected abstract formatMask(raw: string): string;
  protected abstract convertToIso(raw: string): string;
  protected abstract formatDisplay(value: any): string;
}
