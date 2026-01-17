import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostsService } from '../../../shared/services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-update-post',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-update-post.component.html',
  styleUrl: './create-update-post.component.scss'
})
export class CreateUpdatePostComponent implements OnInit {

  postForm!: FormGroup
  postValues!: any

  constructor(
    private fb: FormBuilder,
    private _PostsService: PostsService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(data?: any) {
    this.postForm = this.fb.group({
      title: [data?.title || '', [Validators.required, Validators.minLength(3)]],
      body: [data?.body || '', Validators.required],
    })
  }

  get F () {
    return this.postForm.controls
  }

  save() {
    this.postValues = this.postForm.value

    let dataToSend = {
      userId: 1,
      title: this.postValues.title,
      body: this.postValues.body,
    }

    this._PostsService.createPost(dataToSend).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/list'])
        this.toastr.success('Created successfully');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
