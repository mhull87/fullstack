import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  private subscription: Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.subscription = this.postsService.getPostListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
    });
  }

  onDelete(postId) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
