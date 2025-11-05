import { createReducer, on } from '@ngrx/store';
import { addFavorite } from './favorites.actions';
import * as FavoritesActions from './favorites.actions';
import { Movie } from 'src/app/core/models/movie.model';

export interface FavoritesState {
  movies: Movie[]; // Store complete movie objects
}

export const initialFavoritesState: FavoritesState = {
  movies: [],
};

export const favoritesReducer = createReducer(
  initialFavoritesState,

  on(FavoritesActions.addFavorite, (state, { movie }) => {
    if (state.movies.some((m) => m.id === movie.id)) return state;

    return {
      ...state,
      movies: [...state.movies, movie],
    };
  }),

  on(FavoritesActions.removeFavorite, (state, { id }) => ({
    ...state,
    movies: state.movies.filter((movie) => movie.id !== id),
  })),
);
