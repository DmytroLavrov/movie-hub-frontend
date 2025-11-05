import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.reducer';

export const selectFavoritesFeature = createFeatureSelector<FavoritesState>('favorites');

// returns an array of movie objects
export const selectFavoriteMovies = createSelector(selectFavoritesFeature, (state) => state.movies);
// returns an array of IDs from an array of objects
export const selectFavoriteIds = createSelector(selectFavoriteMovies, (movies) =>
  movies.map((movie) => movie.id),
);

export const selectIsFavorite = (id: number) =>
  createSelector(selectFavoriteIds, (ids) => ids.includes(id));
