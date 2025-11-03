import { createAction, props } from '@ngrx/store';

export const addFavorite = createAction('[Favorites] Add Favorite Movie', props<{ id: number }>());
export const removeFavorite = createAction(
  '[Favorites] Remove Favorite Movie',
  props<{ id: number }>(),
);
