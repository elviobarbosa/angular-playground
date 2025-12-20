import { Directive, HostListener, inject } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[cepMask]",
  standalone: true,
})
export class CepMaskDirective {
  private ngControl = inject(NgControl);

  @HostListener("input", ["$event"])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, "");

    if (value.length > 8) {
      value = value.substring(0, 8);
    }

    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    this.ngControl.control?.setValue(value, { emitEvent: false });
  }
}
