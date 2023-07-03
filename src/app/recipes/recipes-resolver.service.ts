import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { AppState } from '../store/app.state.interface';
import { fetchRecipes, setRecipes } from './store/recipe.actions';
import { map, of, switchMap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    // private dataStorageService: DataStorageService,
    private recipesService: RecipeService,
    private store: Store<AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      take(1),
      map((recipeState) => recipeState.recipes),
      switchMap((recipes) => {
        if (recipes.length) {
          return of(recipes);
        } else {
          this.store.dispatch(fetchRecipes());
          return this.actions$.pipe(
            ofType(setRecipes),
            take(1),
            map((recipesState) => recipesState.payload)
          );
        }
      })
    );

    // const recipes = this.recipesService.getRecipes();

    // if (recipes.length === 0) {
    //   return this.dataStorageService.fetchRecipes();
    // } else {
    //   return recipes;
    // }
  }
}
