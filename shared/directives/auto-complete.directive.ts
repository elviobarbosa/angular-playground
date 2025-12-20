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
  signal,
  computed,
} from "@angular/core";

import { FormControl } from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  of,
  switchMap,
  tap,
} from "rxjs";
import { AutocompleteService } from "../services/auto-complete.service";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

import { InjectionToken } from "@angular/core";

export const AUTOCOMPLETE_DS = new InjectionToken<AutocompleteDataSource<any>>(
  "AUTOCOMPLETE_DATA_SOURCE"
);

export interface AutocompleteDataSource<T> {
  search(term: string): Observable<T[]>;
}

@Directive()
export abstract class BaseAutocompleteDirective<T> implements OnInit {
  protected dataSource = inject<AutocompleteDataSource<T>>(AUTOCOMPLETE_DS);

  control = input.required<FormControl<string>>();
  minChars = input(2);

  results = signal<T[]>([]);
  loading = signal(false);
  searched = signal(false);

  showNoResults = computed(
    () => this.searched() && !this.loading() && this.results().length === 0
  );

  ngOnInit() {
    this.control()
      .valueChanges.pipe(
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
      });
  }
}
