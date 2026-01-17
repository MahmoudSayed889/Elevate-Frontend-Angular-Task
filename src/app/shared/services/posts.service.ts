import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseURL:string = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<any> {
    return this.http.get(`${this.baseURL}/posts`)
  }

  getPost(postID:number): Observable<any> {
    return this.http.get(`${this.baseURL}/posts/${postID}`)
  }

  createPost(model: Post): Observable<any> {
    return this.http.post(`${this.baseURL}/posts`, model)
  }

  updatePost(postID:number, model: Post): Observable<any> {
    return this.http.put(`${this.baseURL}/posts/${postID}`, model)
  }

  getCommentsByPostId(postID:number): Observable<any> {
    return this.http.get(`${this.baseURL}/posts/${postID}/comments`)
  }
}
