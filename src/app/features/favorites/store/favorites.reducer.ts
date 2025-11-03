import { createReducer, on } from '@ngrx/store';
import { addFavorite } from './favorites.actions';
import * as FavoritesActions from './favorites.actions';

export interface FavoritesState {
  ids: number[]; // Array of favorite movie IDs
}

export const initialFavoritesState: FavoritesState = {
  ids: [],
};

export const favoritesReducer = createReducer(
  initialFavoritesState,

  on(FavoritesActions.addFavorite, (state, { id }) => {
    if (state.ids.includes(id)) return state;
    return {
      ...state,
      ids: [...state.ids, id],
    };
  }),

  on(FavoritesActions.removeFavorite, (state, { id }) => ({
    ...state,
    ids: state.ids.filter((movieId) => movieId !== id),
  })),
);
