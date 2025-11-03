import * as fromMovies from '../features/movies/store/movies.reducer';
import * as fromFavorites from '../features/favorites/store/favorites.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  movies: fromMovies.MoviesState;
  favorites: fromFavorites.FavoritesState;
}

export const appReducer: ActionReducerMap<AppState> = {
  movies: fromMovies.moviesReducer,
  favorites: fromFavorites.favoritesReducer,
};
