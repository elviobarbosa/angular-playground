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
import { SELECT_DATA_SOURCE } from "./tokens";
import { SelectDataSource } from "./select-data-source";
import { MatInput } from "@angular/material/input";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";

@Directive()
export abstract class BaseSelectDirective<T> implements OnInit {
  protected dataSource = inject<SelectDataSource<T>>(SELECT_DATA_SOURCE);
  // protected ngControl = inject(NgControl, { self: true, optional: true });
  protected destroyRef = inject(DestroyRef);

  // Configurações
  // minChars = input(0); // Select normalmente carrega tudo
  // debounce = input(300);
  // displayTime = input(5000);

  // Estado
  results = signal<T[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  searched = signal(false);

  showNoResults = computed(
    () =>
      this.searched() &&
      !this.loading() &&
      !this.error() &&
      this.results().length === 0
  );

  // get control(): FormControl {
  //   return this.ngControl?.control as FormControl;
  // }

  ngOnInit() {
    // if (!this.ngControl?.control) {
    //   if (ngDevMode) {
    //     console.warn('BaseSelectDirective precisa estar em um FormControl');
    //   }
    //   return;
    // }

    this.loadData();
  }

  protected loadData(searchTerm: string = "") {
    this.loading.set(true);
    this.error.set(null);
    this.searched.set(false);

    this.dataSource
      .load()
      .pipe(
        retry(1),
        catchError((err) => {
          this.error.set("Erro ao buscar dados");
          console.error("Erro:", err);
          return of([]);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => {
        this.results.set(res);
        this.loading.set(false);
        this.searched.set(true);
      });
  }

  reload() {
    this.loadData();
  }
}
