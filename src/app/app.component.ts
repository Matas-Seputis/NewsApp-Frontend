import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { INews } from './models/news';
import { IPagination } from './models/pagination';
import { NewsService } from './news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'newsapp';
  newsResponse: INews[] =[];
  news: INews[] =[];
  keyword: string = ""
  category: string = ""
  isSorted: boolean = false;

  constructor(private newService: NewsService, private http: HttpClient){}

  ngOnInit(){
    this.getNewsInformation();
  }

  public getNewsInformation(){
    this.newService.getNews(this.category).subscribe((response:any) => {
      this.newsResponse = response.data;
      this.newsResponse.forEach(value => {
        value.sortDate = this.parseDate(value.published_at);
      })
      this.news = this.newsResponse;

      if(this.category != "" || this.keyword != ""){
        this.search();
      }
    }, error => {
      console.log(error);
    });
  }

  public search() {
    this.news = [];

    this.newsResponse.forEach(value => {
      if(this.keyword === "" && this.category != "" && value.category === this.category){
        this.news.push(value);
      }
      if(this.category === "" && this.keyword != "" && value.title.includes(this.keyword)){
        this.news.push(value);
      }

      if(this.category != "" && this.keyword != ""){
        if(value.category === this.category && value.title.includes(this.keyword)){
          this.news.push(value);
        }
      }
    });
  }

  public sort(){
    if(!this.isSorted){
      this.news.sort((a: INews, b: INews) => {
        return a.sortDate.getTime() - b.sortDate.getTime();
      });
      this.isSorted = true;
    }else {
      this.getNewsInformation();
      this.isSorted = false;
    }

  }

  public reset(){
    this.keyword = "";
    this.category = "";
    this.getNewsInformation();
  }

  public shortenDesc(description: string) {
    description = description.substring(0, 50);
    return description + " ...";
  }

  private parseDate(input: string) {
    let dateTime = input.split('T', 2);
    let  date = dateTime[0].split('-', 3);
    let microTime = dateTime[1].split('+', 2)
    let time = microTime[0].split(':', 3);
    // @ts-ignore
    return new Date(date[0], date[1]-1, date[2], time[0], time[1], time[2]);
  }


}
