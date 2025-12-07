import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface PixKey {
  key: string;
  type: "CPF" | "CNPJ" | "EMAIL" | "PHONE" | "RANDOM";
  owner: string;
  bank: string;
}

@Injectable({
  providedIn: "root",
})
export class PixService {
  private http = inject(HttpClient);

  searchKeys(query: string): Observable<PixKey[]> {
    return this.http.get<PixKey[]>(`api/pix/search/${query}`);
  }
}
