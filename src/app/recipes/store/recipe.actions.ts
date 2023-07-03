import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const setRecipes = createAction(
  '[recipe] set recipes',
  props<{
    payload: Recipe[];
  }>()
);
export const fetchRecipes = createAction('[recipe] fetch recipes');
export const addRecipe = createAction(
  '[recipe] add recipe',
  props<{
    payload: Recipe;
  }>()
);
export const updateRecipe = createAction(
  '[recipe] update recipe',
  props<{
    payload: {
      index: number;
      recipe: Recipe;
    };
  }>()
);
export const deleteRecipe = createAction(
  '[recipe] delete recipe',
  props<{
    payload: number;
  }>()
);
export const storeRecipes = createAction('[recipe] store recipe');
