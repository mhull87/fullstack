import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    this.http
      .get<{ message: string, posts: any }>
      ('http://localhost:3000/diary')
      .pipe(
        map(postData => {
        return postData.posts.map(post => {
          return {
            date: post.date,
            location: post.location,
            entry: post.entry,
            id: post._id,
            imagePath: post.imagePath
          };
        });
      }))
      .subscribe(newPosts => {
        this.posts = newPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http
      .get<{ _id: string, date: string, location: string, entry: string, imagePath: string }>
      ('http://localhost:3000/diary/' + id);
  }

  addPost(date: string, location: string, entry: string, image: File) {
    const postData = new FormData();
    postData.append('date', date);
    postData.append('location', location);
    postData.append('entry', entry);
    postData.append('image', image, date);
    this.http
      .post<{ message: string, post: Post }>
      ('http://localhost:3000/diary', postData)
      .subscribe(responseData => {
        const post: Post = {
          id: responseData.post.id,
          date: date,
          location: location,
          entry: entry,
          imagePath: responseData.post.imagePath
        };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, date: string, location: string, entry: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('date', date);
      postData.append('location', location);
      postData.append('entry', entry);
      postData.append('image', image, date);
    } else {
      postData = {
        id: id,
        date: date,
        location: location,
        entry: entry,
        imagePath: image
      };
    }
    this.http
      .put('http://localhost:3000/diary/' + id, postData)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        const post: Post = {
          id: id,
          date: date,
          location: location,
          entry: entry,
          imagePath: ''
        };
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/diary/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

}
