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
} from "@angular/core";

import { FormControl } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
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
  private service = inject(AutocompleteService);
  private el = inject(ElementRef<HTMLInputElement>);

  @Input() endpoint!: string;
  @Input() params?: Record<string, any>;

  @Input() displayKey: string = "label";
  @Input() subDisplayKey?: string;

  @Input() displayFn?: (item: any) => string;

  @Output() optionSelected = new EventEmitter<any>();

  control = input<FormControl<string>>();
  results: any[] = [];
  loading = false;

  ngOnInit() {
    this.listenToTyping();
  }

  // BaseAutocompleteDirective (CORRETO)
  // BaseAutocompleteDirective

  private listenToTyping() {
    console.log(this.control());

    this.control()
      ?.valueChanges.pipe(
        // Filtra valores nulos/vazios e exige mais de 1 caractere para iniciar a busca.
        // Se a máscara estiver configurada para limpar o valor (somente dígitos) no control(),
        // este filtro deve funcionar bem.
        filter((v) => !!v && v.length > 1),

        // Espera 300ms antes de emitir o valor (evita chamadas excessivas durante a digitação rápida)
        debounceTime(300),

        // Garante que a busca só ocorra se o valor for diferente da busca anterior
        distinctUntilChanged(),

        // Marca o estado como carregando antes de fazer a chamada de API
        tap(() => (this.loading = true)),

        // Cancela a requisição anterior se uma nova digitação ocorrer (evita condições de corrida)
        switchMap((term) =>
          this.service.search(this.endpoint, term!, this.params)
        ),

        // Marca o estado como carregado após a conclusão da chamada
        tap(() => (this.loading = false))
      )
      .subscribe((res) => {
        console.log(res);
        // Atualiza a lista de resultados, tratando se a resposta é um array ou um objeto com a chave 'results'
        this.results = (Array.isArray(res) ? res : (res as any).results) ?? [];
      });
  }
  // private listenToTyping() {
  //   console.log(this.control());
  //   this.control()
  //     ?.valueChanges.pipe(
  //       filter((v) => !!v && v.length > 1),
  //       debounceTime(300),
  //       distinctUntilChanged(),
  //       tap(() => (this.loading = true)),
  //       switchMap((term) =>
  //         this.service.search(this.endpoint, term!, this.params)
  //       ),
  //       tap(() => (this.loading = false))
  //     )
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.results = (Array.isArray(res) ? res : (res as any).results) ?? [];
  //     });
  // }

  onSelect(event: MatAutocompleteSelectedEvent) {
    this.optionSelected.emit(event.option.value);
  }

  format(item: any): string {
    if (!item) return "";
    if (this.displayFn) return this.displayFn(item);

    if (this.subDisplayKey) {
      return `${item[this.displayKey]} - ${item[this.subDisplayKey]}`;
    }

    return item[this.displayKey];
  }
}
