import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../shared/services/posts.service';
import { Post } from '../../../shared/models/post';
import { RouterModule } from "@angular/router";
import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../shared/models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [RouterModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  users: User[] = []
  posts: Post[] = []
  allPosts: Post[] = []

  searchTrem: string = ''

  constructor(
    private _PostsService: PostsService,
    private _UsersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.getPosts()
    this.getUsers()
  }

  getPosts() {
    this._PostsService.getPosts().subscribe(
      {
        next: (posts) => {
          this.posts = posts
          this.allPosts = posts
          console.log(posts);
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  getUsers() {
    this._UsersService.getUsers().subscribe(
      {
        next: (users) => {
          this.users = users
          console.log(users);
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  getName(listType: string, itemId: number) {
    let dataFound: any
    switch (listType) {
      case 'users':
        if (this.users) {
          dataFound = this.users.find((element) => element.id == itemId);
        }
        break;
      default:
        break;
    }
    return dataFound
  }

  search() {
    this.posts = this.allPosts.filter(currentPost => currentPost.title.toLocaleLowerCase().includes(this.searchTrem.toLocaleLowerCase()))
  }
}
