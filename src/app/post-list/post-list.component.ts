import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { postPreview } from '../models/postPreviewModel';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() postList: postPreview[] = [];
  constructor() { }

  ngOnInit(): void {
    console.log(this.postList);
  }
  
  test(){
    console.log(this.postList);
  }

}
