import {
  Directive,
  OnInit,
  inject,
  input,
  signal,
  computed,
} from "@angular/core";

import { NgControl } from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  of,
  switchMap,
  tap,
} from "rxjs";

import {
  AUTOCOMPLETE_DS,
  AutocompleteDataSource,
} from "./base-auto-complete.entities";

@Directive()
export abstract class BaseAutocompleteDirective<T> implements OnInit {
  protected dataSource = inject<AutocompleteDataSource<T>>(AUTOCOMPLETE_DS);
  private ngControl = inject(NgControl);

  minChars = input(2);

  results = signal<T[]>([]);
  loading = signal(false);
  searched = signal(false);

  displayTime = input(5000);

  showNoResults = computed(
    () => this.searched() && !this.loading() && this.results().length === 0
  );

  ngOnInit() {
    const control = this.ngControl.control;
    if (!control) return;
    control.valueChanges
      .pipe(
        filter((v) => !!v && v.length >= this.minChars()),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.loading.set(true);
          this.searched.set(false);
        }),
        switchMap((term) =>
          this.dataSource.search(term!).pipe(catchError(() => of([])))
        )
      )
      .subscribe((res) => {
        this.results.set(res);
        this.loading.set(false);
        this.searched.set(true);

        if (res.length === 0) {
          setTimeout(() => {
            this.searched.set(false);
          }, this.displayTime());
        }
      });
  }
}
