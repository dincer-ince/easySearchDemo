import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { post } from '../models/postModel';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent implements OnInit {

  constructor(private service:PostService,private route: ActivatedRoute) { }

  @Input() isSearch:number = 0;
  @Input() postId:number=-1;
  post!:Observable<post>;
  loadingSimilar:boolean=false;
  similarPostList!:Observable<post[]>;
  ngOnInit(): void {
    
    if(this.postId ==-1){
      this.route.params.subscribe((params:Params) =>{

        this.postId = params['id'];
        this.post = this.service.GetPost(this.postId);
        this.similarPostList = new Observable<post[]>();
        this.loadingSimilar = false;

      }).unsubscribe;
    }
    else{
      this.post = this.service.GetPost(this.postId);
    }
    
  }



  loadSimilarDocs(){
    this.loadingSimilar=true;
    this.similarPostList = this.service.GetSimilarPosts(3,this.postId).pipe(tap((res)=>{
      this.loadingSimilar=false;
    }));
  }

  seeTheMostSimilarDocument(){
    this.similarPostList = this.service.GetSimilarPosts(1,this.postId);
  }

}
