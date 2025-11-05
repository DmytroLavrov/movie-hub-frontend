import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/core/models/movie.model';

export const addFavorite = createAction(
  '[Favorites] Add Favorite Movie',
  props<{ movie: Movie }>(),
);
export const removeFavorite = createAction(
  '[Favorites] Remove Favorite Movie',
  props<{ id: number }>(),
);
