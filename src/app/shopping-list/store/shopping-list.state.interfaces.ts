import { Ingredient } from 'src/app/shared/ingredient.model';

export interface State {
  ingridients: Ingredient[];
  editedIngridient: Ingredient;
  editedIngridientIndex: number;
}
