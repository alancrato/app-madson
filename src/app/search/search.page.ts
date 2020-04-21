import { Component, OnInit } from '@angular/core';
import {WpServiceService} from '../services/wp-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  providers: [ WpServiceService ]
})
export class SearchPage implements OnInit {

  result: any = [];
  searchStr: string;
  searching: boolean;
  page = 1;

  constructor(
      private wordpressService: WpServiceService
  ) { }

  ngOnInit() {}

  search() {
    this.wordpressService.search(this.searchStr, this.page)
        .subscribe(data => {
            this.result = data;
        });
  }
}
