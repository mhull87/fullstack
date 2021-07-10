import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CreateComponent } from './posts/create/create.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:postId', component: CreateComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
