import { State as AuthState } from '../auth/store/auth.state.interface';
import { State as ShoppingListState } from '../shopping-list/store/shopping-list.state.interfaces';
import { State as RecipesState } from '../recipes/store/recipe.state.interfaces';

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
  recipes: RecipesState;
}
