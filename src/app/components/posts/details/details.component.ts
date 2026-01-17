import { Component, OnInit } from '@angular/core';
import { Post } from '../../../shared/models/post';
import { PostsService } from '../../../shared/services/posts.service';
import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../shared/models/user';
import { Comment } from '../../../shared/models/comment';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  users: User[] = []
  comments: Comment[] = []
  post!: Post

  constructor(
    private _PostsService: PostsService,
    private _UsersService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getUsers()

    this.route.params.subscribe((res) => {
      if (res['postId']) {
        this.getPost(res['postId'])
        this.getCommentsByPostId(res['postId'])
      }
    })
  }

  getPost(postId: number) {
    this._PostsService.getPost(postId).subscribe(
      {
        next: (post) => {
          this.post = post
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  getCommentsByPostId(postId: number) {
    this._PostsService.getCommentsByPostId(postId).subscribe(
      {
        next: (comments) => {
          this.comments = comments
          console.log(comments);
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
}
