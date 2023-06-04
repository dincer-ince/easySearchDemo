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

  isAddcomment=false;

  @Input() isSearch:number = 0;
  @Input() postId:number=-1;
  post!:Observable<post>;
  loadingSimilar:boolean=false;
  similarPostList!:Observable<post[]>;
  commentList!:Observable<post[]>;
  ngOnInit(): void {
    
    if(this.postId ==-1){
      this.route.params.subscribe((params:Params) =>{

        this.postId = params['id'];
        this.post = this.service.GetPost(this.postId);
        this.similarPostList = new Observable<post[]>();
        this.commentList = this.service.queryField(2,this.postId.toString());
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

  upvote(upvoteNumber:string,documentId:number){
     var field = parseInt(upvoteNumber)+1;
    this.service.upvote(field+"",documentId).subscribe(x=>{
      this.post = this.service.GetPost(this.postId);
    })
  }

  downvote(upvoteNumber:string,documentId:number){
    var field = parseInt(upvoteNumber)+1;
   this.service.downvote(field+"",documentId).subscribe(x=>{
     this.post = this.service.GetPost(this.postId);
   })
 }

 postcomment(title:string,comment:string){
  if(title =="" || comment=="") return;
  this.service.newComment(this.postId,title,comment).subscribe(x=>{
    this.commentList = this.service.queryField(2,this.postId.toString());
    this.isAddcomment=false;
  })
 }

}
