import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { post } from '../models/postModel';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor(private service:PostService,private route: ActivatedRoute) { }
  searchQuery:string ="";
  postList?:Observable<post[]>;
  ngOnInit(): void {
    console.log(this.postList)
    this.route.params.subscribe((params:Params) =>{
      this.searchQuery = params['text'];
      this.postList = this.service.search(this.searchQuery);
    }).unsubscribe;

  }

  test(){
    console.log(this.searchQuery);
    
  }

}
