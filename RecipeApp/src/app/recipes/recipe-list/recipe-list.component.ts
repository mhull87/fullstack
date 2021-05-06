import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'Test Recipe Discription', 'https://www.mtpr.org/sites/kufm/files/styles/x_large/public/201703/Stuffed-Cabbage_Steven-Depolo_CC-BY-20.jpg'),
    new Recipe('Another Test Recipe', 'Test Recipe Discription', 'https://www.mtpr.org/sites/kufm/files/styles/x_large/public/201703/Stuffed-Cabbage_Steven-Depolo_CC-BY-20.jpg')

  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
