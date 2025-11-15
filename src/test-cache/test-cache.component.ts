import { Component, inject } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-test-cache',
  imports: [],
  templateUrl: './test-cache.component.html',
  styleUrl: './test-cache.component.css'
})
export class TestCacheComponent {
  posts: any[] = [];
  users: any[] = [];
  currentPost: any = null;
  loading = false;
  
  private apiService = inject(ApiService)

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.loading = true;
    

    this.apiService.getPosts().subscribe(data => {
      this.posts = data.slice(0, 10);
      this.loading = false;
      console.log('Posts carregados!');
    });
  }

  carregarUsuarios(): void {
    this.loading = true;
    
    this.apiService.getUsers().subscribe(data => {
      this.users = data;
      this.loading = false;
      console.log('Usuários carregados!');
    });
  }

  mostrarPost(id: number): void {
    this.loading = true;
    
    this.apiService.getPost(id).subscribe(data => {
      this.currentPost = data;
      this.loading = false;
      console.log(`Post ${id} carregado!`);
    });
  }

  limparCache(): void {
    this.apiService.clearCache();
    this.currentPost = null;
  }

  demonstrarCache(): void {
    console.log('Primeira chamada (deve fazer a requisição)');
    this.apiService.getPosts().subscribe(() => {
      console.log('Segunda chamada (deve usar cache)');
      this.apiService.getPosts().subscribe(() => {
        console.log('Terceira chamada (deve usar cache)');
        this.apiService.getPosts().subscribe();
      });
    });
  }
}
