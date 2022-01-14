import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from './models/pagination';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getNews(category: string){
    if(category != ""){
      return this.http.get<IPagination>(this.baseUrl + 'news' + "?category=" + category);
    }else {
      return this.http.get<IPagination>(this.baseUrl + 'news');
    }
  }
}
