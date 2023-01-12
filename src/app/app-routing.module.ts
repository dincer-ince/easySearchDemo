import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostComponentComponent } from './post-component/post-component.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'posts/:id', component: PostComponentComponent },
  { path: 'search/:text', component: SearchPageComponent },
  { path: 'newpost', component: NewPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
