import { createReducer, on } from '@ngrx/store';
import { Movie, MovieDetails } from 'src/app/core/models/movie.model';
import * as MoviesActions from './movies.actions';

const MAX_PAGES_LIMIT = 500;

export interface MoviesState {
  list: Movie[];
  selectedMovie: MovieDetails | null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: any;
  currentQuery: string;
}

export const initialMoviesState: MoviesState = {
  list: [],
  selectedMovie: null,
  currentPage: 0,
  totalPages: 0,
  loading: false,
  error: null,
  currentQuery: '',
};

export const moviesReducer = createReducer(
  initialMoviesState,

  on(MoviesActions.loadPopularMovies, (state, { query, page }) => ({
    ...state,
    loading: true,
    error: null,
    currentQuery: query,
    list: page === 1 ? [] : state.list,
  })),

  on(MoviesActions.loadPopularMoviesSuccess, (state, { movies, totalPages, currentPage }) => ({
    ...state,
    list: movies, // Replace the list
    totalPages: Math.min(totalPages, MAX_PAGES_LIMIT),
    currentPage,
    loading: false,
  })),

  on(MoviesActions.loadPopularMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(MoviesActions.loadMovieDetail, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedMovie: null,
  })),

  on(MoviesActions.loadMovieDetailSuccess, (state, { movie }) => ({
    ...state,
    selectedMovie: movie,
    loading: false,
  })),

  on(MoviesActions.loadMovieDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    selectedMovie: null,
  })),
);
