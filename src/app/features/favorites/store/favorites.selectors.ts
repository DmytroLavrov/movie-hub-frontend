import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.reducer';

export const selectFavoritesFeature = createFeatureSelector<FavoritesState>('favorites');

export const selectFavoriteIds = createSelector(selectFavoritesFeature, (state) => state.ids);
export const selectIsFavorite = (id: number) =>
  createSelector(selectFavoriteIds, (ids) => ids.includes(id));
