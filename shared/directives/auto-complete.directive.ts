import {
  Directive,
  Input,
  HostListener,
  OnInit,
  inject,
  ElementRef,
  Output,
  EventEmitter,
  forwardRef,
input,
} from '@angular/core';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs';
import { AutocompleteService } from '../services/auto-complete.service';

@Directive({
  selector: '[baseAutocomplete]',
  standalone: true,
  exportAs: 'baseAutocompleteApi',
  providers: [
    {
      provide: 'baseAutocompleteApi',
      useExisting: forwardRef(() => BaseAutocompleteDirective),
    },
  ],
})
export class BaseAutocompleteDirective implements OnInit {
  private service = inject(AutocompleteService);
  private el = inject(ElementRef<HTMLInputElement>);

  @Input() endpoint!: string;
  @Input() params?: Record<string, any>;

  @Input() displayKey: string = 'label';
  @Input() subDisplayKey?: string;

  @Input() displayFn?: (item: any) => string;

  @Output() optionSelected = new EventEmitter<any>();

  control = input<FormControl<string>>();
  results: any[] = [];
  loading = false;

  ngOnInit() {
    this.listenToTyping();
  }

  private listenToTyping() {
    this.control()?.valueChanges
      .pipe(
        filter((v) => !!v && v.length > 1),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap((term) =>
          this.service.search(this.endpoint, term!, this.params)
        ),
        tap(() => (this.loading = false))
      )
      .subscribe((res) => {
        this.results = (Array.isArray(res) ? res : (res as any).results) ?? [];
      });
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    this.optionSelected.emit(event.option.value);
  }

  format(item: any): string {
    if (!item) return '';
    if (this.displayFn) return this.displayFn(item);

    if (this.subDisplayKey) {
      return `${item[this.displayKey]} - ${item[this.subDisplayKey]}`;
    }

    return item[this.displayKey];
  }
}
