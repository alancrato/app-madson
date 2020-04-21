import { Component, OnInit } from '@angular/core';
import { WpServiceService } from '../services/wp-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  providers: [ WpServiceService ]
})
export class PostPage implements OnInit {

  title;
  content;
  thumb = [];

  constructor(
      public wordpressService: WpServiceService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');

    this.wordpressService
        .getPost(id)
        .subscribe(data => {
           this.title = data.title.rendered;
           this.content = data.content.rendered;
           this.thumb = data.better_featured_image.media_details.sizes.medium.source_url;
        });
  }

}
