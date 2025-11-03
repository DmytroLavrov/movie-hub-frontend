import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/core/models/movie.model';

export const loadPopularMovies = createAction(
  '[Movies] Load Popular Movies',
  props<{ query: string; page: number }>(),
);

export const loadPopularMoviesSuccess = createAction(
  '[Movies] Load Popular Movies Success',
  props<{ movies: Movie[]; currentPage: number; totalPages: number }>(),
);

export const loadPopularMoviesFailure = createAction(
  '[Movies] Load Popular Movies Failure',
  props<{ error: any }>(),
);

export const loadMovieDetail = createAction('[Movies] Load Movie Detail', props<{ id: number }>());

export const loadMovieDetailSuccess = createAction(
  '[Movies] Load Movie Detail Success',
  props<{ movie: Movie }>(),
);

export const loadMovieDetailFailure = createAction(
  '[Movies] Load Movie Detail Failure',
  props<{ error: any }>(),
);
