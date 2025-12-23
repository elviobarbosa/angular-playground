import { InjectionToken, WritableSignal } from "@angular/core";
import { SelectDataSource } from "./select-data-source";
import { AutocompleteParams } from "../../components/rick-morty/services/rick-morty.entities";

export const SELECT_DATA_SOURCE = new InjectionToken<SelectDataSource<any>>(
  "SELECT_DATA_SOURCE"
);

export const SELECT_PARAMS = new InjectionToken<
  WritableSignal<Record<string, any>>
>("SELECT_PARAMS");
