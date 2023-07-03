import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../auth/store/auth.reducer';
import { recipeReducer } from '../recipes/store/recipe.reducer';

import { shoppingListReducer } from '../shopping-list/store/shopping-list.reducer';
import { AppState } from './app.state.interface';

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipes: recipeReducer,
};
