import * as fromMovies from '../features/movies/store/movies.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  movies: fromMovies.MoviesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  movies: fromMovies.moviesReducer,
};
