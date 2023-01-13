import { Component, HostListener, OnInit } from '@angular/core';
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
    var width = window.visualViewport?.width;
    
    if(width != null){
      if( width < 992 ){
        var sidebar = document.getElementById("sidebarCollapse")
        if(sidebar!=null) sidebar.classList.remove("show");
      }
    }
    

    
  }

  collapse(){
    if (window.innerWidth>992){
      return;
    }
    var button = document.getElementById("toggler");
    if(button==null) return;
    button.click()
  }

@HostListener('window:resize', ['$event'])
onResize(event:any) {
  var width = event.target.innerWidth;
  if(width>992){
    var sidebar = document.getElementById("sidebarCollapse")
    if(sidebar!=null) sidebar.classList.add("show");
  }
}

  

}
