import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const addIngredient = createAction(
  '[shoppingList] add ingredient',
  props<{ payload: Ingredient }>()
);
export const addIngredients = createAction(
  '[shoppingList] add ingredients',
  props<{ payload: Ingredient[] }>()
);
export const updateIngredient = createAction(
  '[shoppingList] update ingredient',
  props<{ payload: Ingredient }>()
);
export const deleteIngredient = createAction(
  '[shoppingList] delete ingredient'
);
export const startEdit = createAction(
  '[shoppingList] start edit',
  props<{ payload: number }>()
);
export const stopEdit = createAction('[shoppingList] stop edit');
