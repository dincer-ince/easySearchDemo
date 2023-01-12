import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private service:PostService, private route:Router) { }

  ngOnInit(): void {
  }

  title = new FormControl('');
  post =  new FormControl('');

  submit(){
    this.service.newPost(this.title.value!,this.post.value!).subscribe((res:any) =>{
      this.service.GetPostList();
      this.route.navigate(['/posts/',res.id]);
    })
  }
}
