import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { postPreview } from '../models/postPreviewModel';
import { post } from '../models/postModel';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  testurl = 'https://localhost:7041/api/';
  url = 'https://easysearchapi.azurewebsites.net/api/';
  urlNoApi = 'https://easysearchapi.azurewebsites.net/';

  

  private getHeader() {
    var options = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2ODU2NzAxMDYsImV4cCI6MTcxNzI5MjUwNiwiaWF0IjoxNjg1NjcwMTA2fQ.LXxd3unOOQNkJPdApALT2aRbqW7vsE9ie16Nf1X8rpA'
      ),
    };
    return options;
  }

  loadFailed = new BehaviorSubject<boolean>(false);
  _postList: BehaviorSubject<postPreview[]> = new BehaviorSubject<postPreview[]>([]);
  postList: Observable<postPreview[]> = this._postList;

  public GetPostList() {
    this._postList.next([]);

    this.http
      .get<postPreview[]>(this.url + 'Documents/list/14', this.getHeader())
      .subscribe(
        (res: postPreview[]) => this._postList.next(res),
        (err) => {
          this.loadFailed.next(true);
        }
      );
  }
  public GetPost(id: number) {
    return this.http.get<post>(this.url + 'Documents/' + id,this.getHeader());
  }
  public GetSimilarPosts(numberOfDocs: number, id: number) {
    return this.http.get<post[]>(
      this.url + 'Documents/similarDocuments/' + numberOfDocs + '/' + id
    );
  }

  public search(text: string) {
    return this.http.get<post[]>(this.url + 'Documents/search/14/' + text);
  }

  public newPost(title: string, post: string) {
    var obj = {
      dictionaryId: 14,
      title: title,
      rawDocument: post,
      extraFields:["0","0"]
    };
    console.log(obj);
    return this.http.post(this.url + 'Documents', obj,this.getHeader());
  }

  public queryField(fieldIndex:number, query:string){
    return this.http.get<post[]>(this.url+"Documents/query/16/"+fieldIndex+"/"+query+"/100");
  }

  public upvote(upvotenumber:string,documentId:number){
    return this.http.put(this.url+"Documents/editDocumentField?document_id="+documentId+"&index="+0+"&text="+upvotenumber,null,this.getHeader())
  }

  public downvote(downwotenumber:string,documentId:number){
    return this.http.put(this.url+"Documents/editDocumentField?document_id="+documentId+"&index="+1+"&text="+downwotenumber,null,this.getHeader())
  }

  public newComment(postId:number,title: string, comment: string) {
    var obj = {
      dictionaryId: 16,
      title: title,
      rawDocument: comment,
      extraFields:["0","0",postId.toString()]
    };
    console.log(obj);
    return this.http.post(this.url + 'Documents', obj,this.getHeader());
  }

}
