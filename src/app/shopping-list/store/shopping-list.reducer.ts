import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { State } from './shopping-list.state.interfaces';
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  startEdit,
  stopEdit,
  updateIngredient,
} from './shopping-list.actions';

const initialState: State = {
  ingridients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngridient: null,
  editedIngridientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => {
    return {
      ...state,
      ingridients: [...state.ingridients, action.payload],
    };
  }),
  on(addIngredients, (state, action) => {
    return {
      ...state,
      ingridients: [...state.ingridients, ...action.payload],
    };
  }),
  on(updateIngredient, (state, action) => {
    const ingridient = state.ingridients[state.editedIngridientIndex];
    const updatedIngredient = {
      ...ingridient,
      ...action.payload,
    };
    const updatedIngredients = [...state.ingridients];
    updatedIngredients[state.editedIngridientIndex] = updatedIngredient;

    return {
      ...state,
      ingridients: updatedIngredients,
      editedIngridient: null,
      editedIngridientIndex: -1,
    };
  }),
  on(deleteIngredient, (state, action) => {
    return {
      ...state,
      ingridients: state.ingridients.filter(
        (e, index) => index !== state.editedIngridientIndex
      ),
      editedIngridient: null,
      editedIngridientIndex: -1,
    };
  }),
  on(startEdit, (state, action) => {
    return {
      ...state,
      editedIngridient: { ...state.ingridients[action.payload] },
      editedIngridientIndex: action.payload,
    };
  }),
  on(stopEdit, (state, action) => {
    return {
      ...state,
      editedIngridient: null,
      editedIngridientIndex: -1,
    };
  })
);

// export function shoppingListReducer(state = initialState, action: Action) {
//   switch (action.type) {
//     case ADD_INGREDIENT:
//       return {
//         ...state,
//         ingredients: [...state.ingredients, action],
//       };
//   }
// }
