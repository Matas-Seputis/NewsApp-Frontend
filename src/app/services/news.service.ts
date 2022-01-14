import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {INews} from 'src/app/models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { 
  }

  ngOnInit() {
  }

}