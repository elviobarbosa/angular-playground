import {
  Directive,
  HostListener,
  OnInit,
  inject,
  ElementRef,
  Output,
  EventEmitter,
  forwardRef,
  Input,
  input,
  output,
} from "@angular/core";

import { FormControl } from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  of,
  switchMap,
  tap,
} from "rxjs";
import { AutocompleteService } from "../services/auto-complete.service";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

@Directive({
  selector: "[baseAutocomplete]",
  standalone: true,
  exportAs: "baseAutocompleteApi",
  providers: [
    {
      provide: "baseAutocompleteApi",
      useExisting: forwardRef(() => BaseAutocompleteDirective),
    },
  ],
})
export class BaseAutocompleteDirective implements OnInit {
  private _service = inject(AutocompleteService);

  endpoint = input.required<string>();
  displayKey = input<string>();
  displayFn = input<(item: any) => string>();
  control = input<FormControl<string>>();

  optionSelected = output<any>();

  results: any[] = [];
  loading = false;
  searchPerformed = false;

  ngOnInit() {
    this.listenToTyping();
  }

  private listenToTyping() {
    this.control()
      ?.valueChanges.pipe(
        filter((v) => !!v && v.length > 1),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.loading = true;
          this.searchPerformed = false;
        }),
        switchMap((term) =>
          this._service.search(this.endpoint(), term!).pipe(
            catchError((error) => {
              console.log("Erro na busca:", error);
              return of([]);
            })
          )
        ),
        tap(() => {
          this.loading = false;
          this.searchPerformed = true;
        })
      )
      .subscribe((res) => {
        this.results = (Array.isArray(res) ? res : (res as any).results) ?? [];
      });
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    this.optionSelected.emit(event.option.value);
  }

  format(item: any): string {
    if (!item) return "";

    const displayFnValue = this.displayFn();
    if (displayFnValue) {
      return displayFnValue(item);
    }

    const key = this.displayKey();
    console.log(key, `key `);
    if (key) {
      return item[key];
    }
    console.log(item, `vazio `);
    return "";
  }

  shouldShowNoResults(): boolean {
    return this.searchPerformed && !this.loading && this.results.length === 0;
  }
}
