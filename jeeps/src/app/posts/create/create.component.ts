import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  date = '';
  location = '';
  entry = '';
  photo = '';

  constructor(public postsService: PostsService) { }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postsService.addPost(form.value.date, form.value.location, form.value.entry, form.value.photo);
    form.resetForm();
  }

  ngOnInit(): void {
  }

}
