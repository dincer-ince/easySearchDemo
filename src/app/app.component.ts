import { Component } from '@angular/core';
import { PostService } from './services/post.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'easySearchDemo';
  constructor(){
  }
  search = new FormControl('');
  
}
