import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { postPreview } from '../models/postPreviewModel';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  postList:Observable<postPreview[]>;
  loadFailed:Observable<boolean>;
  constructor(private service:PostService) {
    this.postList = this.service.postList;
    this.loadFailed = this.service.loadFailed;
   }

  
  ngOnInit(): void {
    this.service.GetPostList();
    
  }

}
