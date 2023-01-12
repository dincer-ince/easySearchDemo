import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { postPreview } from '../models/postPreviewModel';
import { post } from '../models/postModel';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  testurl = 'https://localhost:7041/api/'
  url = 'https://easy-search-api.azurewebsites.net/api/';
  urlNoApi = 'https://easy-search-api.azurewebsites.net/';
  
  loadFailed=new BehaviorSubject<boolean>(false);
  _postList:BehaviorSubject<postPreview[]> = new BehaviorSubject<postPreview[]>([]);
  postList:Observable<postPreview[]> = this._postList;

  public GetPostList(){
    this._postList.next([]);

    this.http.get<postPreview[]>(this.url + "Documents/posts").subscribe((res:postPreview[])=>this._postList.next(res),
    err =>{
      this.loadFailed.next(true);
    });
    
  }
  public GetPost(id:number){
    return this.http.get<post>(this.url + "Documents/post/" + id);
  }
  public GetSimilarPosts(numberOfDocs:number,id:number){
    return this.http.get<post[]>(this.url + "Documents/similarDocuments/"+numberOfDocs+"/"+id);
  }

  public search(text:string){
    return this.http.get<post[]>(this.url + "Documents/search/"+text);
  }

  
  
  public newPost(title:string, post:string){
    var obj = {
      dictionaryId: 1,
      title: title,
      rawDocument: post
    }
    console.log(obj);
    return this.http.post(this.url + "Documents", obj);
  }

}
