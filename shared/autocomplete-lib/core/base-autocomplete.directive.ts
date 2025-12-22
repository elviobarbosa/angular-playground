import {
  Directive,
  OnInit,
  inject,
  signal,
  computed,
  input,
  DestroyRef,
} from "@angular/core";
import { FormControl, NgControl } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  catchError,
  tap,
  retry,
} from "rxjs/operators";
import { of } from "rxjs";
import { AUTOCOMPLETE_DATA_SOURCE } from "./tokens";
import { AutocompleteDataSource } from "./autocomplete-data-source";
import { MatInput } from "@angular/material/input";

@Directive()
export abstract class BaseAutocompleteDirective<T> implements OnInit {
  protected dataSource = inject<AutocompleteDataSource<T>>(
    AUTOCOMPLETE_DATA_SOURCE
  );
  protected input = inject(MatInput);
  protected matInput = inject(MatInput, { self: true });
  protected ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  get control(): FormControl {
    return this.ngControl?.control as FormControl;
  }

  // control = input.required<FormControl<string>>();
  minChars = input(2);
  debounce = input(300);
  displayTime = input(5000);

  results = signal<T[]>([]);
  loading = signal(false);
  error = signal(false);
  searched = signal(false);

  showNoResults = computed(
    () =>
      this.searched() &&
      !this.loading() &&
      !this.error() &&
      this.results().length === 0
  );

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    if (!this.matInput || !this.ngControl?.control) {
      if (ngDevMode) {
        console.warn(
          "BaseAutocompleteDirective precisa estar em um input com matInput e FormControl"
        );
      }
      return;
    }
    this.input
      .ngControl!.valueChanges?.pipe(
        filter((v): v is string => !!v && v.length >= this.minChars()),
        debounceTime(this.debounce()),
        distinctUntilChanged(),
        tap(() => {
          this.loading.set(true);
          this.error.set(false);
          this.searched.set(false);
        }),
        switchMap((term) =>
          this.dataSource.search(term).pipe(
            retry(1),
            catchError(() => {
              this.error.set(true);
              return of([]);
            })
          )
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
