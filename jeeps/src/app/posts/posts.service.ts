import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/diary')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(date: string, location: string, entry: string, photo: string) {
    const post: Post = {id: null, date: date, location: location, entry: entry, photo: photo}
    this.http.post<{ message: string, post: Post }>('http://localhost:3000/diary', post)
      .subscribe((responseData) => {
        console.log(responseData);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
