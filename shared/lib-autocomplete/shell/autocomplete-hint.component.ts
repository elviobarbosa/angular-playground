import { Component, ContentChild, input, TemplateRef } from "@angular/core";
import { BaseAutocompleteDirective } from "../core/base-autocomplete.directive";
import { NgTemplateOutlet } from "@angular/common";
@Component({
  selector: "autocomplete-hint",
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: "./autocomplete-hint.component.html",
})
export class AutocompleteHintComponent<T> {
  api = input.required<BaseAutocompleteDirective<T>>();

  loadingText = input("Carregando…");
  emptyText = input("Nenhum resultado encontrado");
  errorText = input("Ocorreu um erro");

  @ContentChild("loading", { read: TemplateRef })
  loadingTpl?: TemplateRef<any>;

  @ContentChild("empty", { read: TemplateRef })
  emptyTpl?: TemplateRef<any>;

  @ContentChild("error", { read: TemplateRef })
  errorTpl?: TemplateRef<any>;
}
