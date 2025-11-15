
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cache } from './cache.decorator'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  @Cache(60000)
  getPosts(): Observable<any[]> {
    console.log('Buscando posts da API...');
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts');
  }

  @Cache()
  getPost(id: number): Observable<any> {
    console.log(`Buscando post ${id} da API...`);
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  @Cache()
  getUsers(): Observable<any[]> {
    console.log('Buscando usuários da API...');
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }
  
  @Cache(120000)
  getWeather(city: string): Observable<any> {
    console.log(`Buscando clima para ${city}...`);
    return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`);
  }

  clearCache(): void {
    Cache.clear();
    console.log('Cache limpo com sucesso!');
  }
}