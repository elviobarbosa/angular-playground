import { Observable } from "rxjs";

export interface SelectDataSource<T> {
  load(): Observable<T[]>;
}
