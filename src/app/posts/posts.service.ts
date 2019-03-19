import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    this.httpClient.get<{result: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((res) => {
      this.posts = res.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.httpClient.post<{result: string}>('http://localhost:3000/api/posts', post)
      .subscribe((res) => {
        console.log(res.result);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}