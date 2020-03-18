import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolveService implements Resolve<Recipe[]> {
    constructor( private dataStorageService: DataStorageService,
                private  recipesService: RecipesService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesService.getRecipes();
        if (recipes.length === 0) {
            return this.dataStorageService.fetchData();
        }
        return recipes;
    }
}