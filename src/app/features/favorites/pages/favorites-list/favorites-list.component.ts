import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, withLatestFrom } from 'rxjs';
import { Movie } from 'src/app/core/models/movie.model';
import { MovieApiService } from 'src/app/core/services/movie-api.service';
import * as FavoritesSelectors from '../../store/favorites.selectors';
import * as FavoritesActions from '../../store/favorites.actions';
import * as MoviesSelectors from '../../../movies/store/movies.selectors';

@Component({
  selector: 'app-favorites-list',
  standalone: false,
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesListComponent implements OnInit {
  // List of movie objects to display
  public favoriteMovies$!: Observable<Movie[]>;
  public favoriteIds$!: Observable<number[]>;

  constructor(
    private store: Store,
    private movieApiService: MovieApiService,
  ) {
    this.favoriteIds$ = this.store.select(FavoritesSelectors.selectFavoriteIds);
  }

  ngOnInit(): void {
    // Get a list of favorite movie IDs from the Store (Favorites Feature State)
    this.favoriteMovies$ = this.favoriteIds$.pipe(
      // Get the current cached list of movies (Movies Feature State)
      withLatestFrom(this.store.select(MoviesSelectors.selectMovieList)),
      // Combining data
      map(([favoriteIds, cachedMovies]) => {
        // Filter cached movies, leaving only those whose IDs are in the favorites list
        const favorites: Movie[] = cachedMovies.filter((movie) => favoriteIds.includes(movie.id));
        return favorites;
      }),
    );
  }

  public onRemoveFavorite(movieId: number): void {
    this.store.dispatch(FavoritesActions.removeFavorite({ id: movieId }));
  }
}
