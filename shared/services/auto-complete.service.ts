import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutocompleteService {
  private http = inject(HttpClient);

  search<T>(
    endpoint: string,
    term: string,
    params?: any
  ): Observable<T[] | { results: T[] }> {
    return this.http.get<T[] | { results: T[] }>(endpoint, {
      params: { name: term, ...params },
    });
  }
}
