import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../pages/interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  headlinesPageCategory: any[] = [];

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
    // return this.http.get<RespuestaTopHeadlines>(`&apiKey=687ce7b5965542a6b95db406f7e4a25c`);
  }
  getTopHeadlinesCategoria(categoria: string) {
    if ( this.headlinesPageCategory[categoria] ) {
      this.headlinesPageCategory[categoria].contPage++;
    } else {
      this.headlinesPageCategory[categoria] = {
        contPage : 1
      };
    }
    const page = this.headlinesPageCategory[categoria].contPage;
    console.log('Categoria', categoria);
    console.log('Page', page);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${page}`);
  }
}
