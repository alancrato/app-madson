import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class WpServiceService {

  apiUrl: any = 'https://madsonvagner.com.br/wp-json/wp/v2/';

  constructor(private http: HttpClient) { }

  public getPosts(page: number): any {
      return this.http.get(this.apiUrl + 'posts/?status=publish&page=' + page);
  }

  public getPostIndex(): any {
      return this.http.get(this.apiUrl + 'posts/?status=publish&categories=3&per_page=1');
  }

  public getPostsIndexOffset(): any {
      return this.http.get(this.apiUrl + 'posts/?status=publish&per_page=6&offset=1');
  }

  public getPostsIndexOffsetInfinite(page: number): any {
      return this.http.get(this.apiUrl + 'posts/?status=publish&offset=7&page' + page);
  }

  public getPost(id: string): any {
      return this.http.get(this.apiUrl + 'posts/' + id);
  }

  public getCategories(): any {
      return this.http.get(this.apiUrl + 'categories?order_by=count&order=desc');
  }

  public getPostsByCat(categoryName: string, page: number): any {
      return this.http.get(this.apiUrl + 'posts/?status=publish&category=' + categoryName + '&page=' + page);
  }

  public getMedia(id: string): any {
      return this.http.get(this.apiUrl + '/media/' + id);
  }

  public search(searchStr: string, page: number): any {
      return this.http.get(this.apiUrl + 'posts/?status=publish&search=' + searchStr + '&page=' + page);
  }
}
