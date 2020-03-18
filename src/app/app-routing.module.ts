import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolveService } from './recipes/recipes-resolve.service';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent},
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolveService]},
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolveService]}

    ] },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'auth', component: AuthComponent }

];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {

}