import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMovies from './movies.reducer';

export const selectMoviesFeature = createFeatureSelector<fromMovies.MoviesState>('movies');

export const selectMovieList = createSelector(selectMoviesFeature, (state) => state.list);
export const selectMoviesLoading = createSelector(selectMoviesFeature, (state) => state.loading);
export const selectMoviesCurrentPage = createSelector(
  selectMoviesFeature,
  (state) => state.currentPage,
);
export const selectMoviesTotalPages = createSelector(
  selectMoviesFeature,
  (state) => state.totalPages,
);
export const selectMoviesCurrentQuery = createSelector(
  selectMoviesFeature,
  (state) => state.currentQuery,
);
export const selectSelectedMovie = createSelector(
  selectMoviesFeature,
  (state) => state.selectedMovie,
);
