import { InjectionToken, WritableSignal } from "@angular/core";
import { AutocompleteDataSource } from "./autocomplete-data-source";
import { AutocompleteParams } from "../../components/rick-morty/services/rick-morty.entities";

export const AUTOCOMPLETE_DATA_SOURCE = new InjectionToken<
  AutocompleteDataSource<any>
>("AUTOCOMPLETE_DATA_SOURCE");

export const AUTOCOMPLETE_PARAMS = new InjectionToken<
  WritableSignal<AutocompleteParams>
>("AUTOCOMPLETE_PARAMS");
