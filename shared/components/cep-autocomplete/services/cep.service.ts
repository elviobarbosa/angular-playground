import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { CepResult } from "./cep.entities";
import { AutocompleteDataSource } from "../../../directives/base-auto-complete/base-auto-complete.entities";

@Injectable()
export class CepAutocompleteDataSource
  implements AutocompleteDataSource<CepResult>
{
  private _http = inject(HttpClient);

  search(term: string): Observable<CepResult[]> {
    return this._http
      .get<any>(`https://viacep.com.br/ws/${term}/json/`)
      .pipe(map((res) => [res]));
  }
}
