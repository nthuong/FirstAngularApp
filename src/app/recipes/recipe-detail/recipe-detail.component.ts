import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipesService } from '../recipes.service';
import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipesService.getRecipe(this.id);
      }
    );
  }
  addIngredientsToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
