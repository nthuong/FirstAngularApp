import { Component, OnInit, Input } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
  }
  addIngredientsToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
