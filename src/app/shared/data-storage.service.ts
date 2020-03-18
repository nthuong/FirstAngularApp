import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient,
                private recipesService: RecipesService,
                private authService: AuthService) {}

    storageData() {
        const recipes = this.recipesService.getRecipes();
        this.http
            .put('https://ng-course-recipe-book-13dcf.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }
    fetchData() {
        return this.http
            .get<Recipe[]>('https://ng-course-recipe-book-13dcf.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return { ... recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                    });
                }),
                tap(recipes => {
                    this.recipesService.setRecipes(recipes);
                })
            );
    }
}
