import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newPost = '';

  constructor() { }

  onSave(entry: HTMLTextAreaElement) {
    console.dir(entry);
    this.newPost = entry.value;
  }

  ngOnInit(): void {
  }

}
