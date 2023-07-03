import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import {
  addIngredient,
  addIngredients,
} from 'src/app/shopping-list/store/shopping-list.actions';
import { AppState } from 'src/app/store/app.state.interface';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { deleteRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.store
            .select('recipes')
            .pipe(
              map((recipesState) =>
                recipesState.recipes.find(
                  (recipe, index) => index === Number(params['id'])
                )
              )
            );
        })
      )
      .subscribe((recipe: Recipe) => (this.recipe = recipe));
  }

  onAddToShoppingList(): void {
    this.store.dispatch(addIngredients({ payload: this.recipe.ingredients }));
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(): void {
    this.store.dispatch(deleteRecipe({ payload: this.id }));
    this.router.navigate(['/recipes']);
  }
}
