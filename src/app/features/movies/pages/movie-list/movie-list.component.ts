import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Movie } from 'src/app/core/models/movie.model';
import * as MoviesActions from '../../store/movies.actions';
import * as MoviesSelectors from '../../store/movies.selectors';
import * as FavoritesActions from '../../../favorites/store/favorites.actions';
import * as FavoritesSelectors from '../../../favorites/store/favorites.selectors';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements OnInit {
  public movies$!: Observable<Movie[]>;
  public loading$!: Observable<boolean>;
  public currentPage$!: Observable<number>;
  public totalPages$!: Observable<number>;
  public currentQuery$!: Observable<string>;
  public favoriteIds$: Observable<number[]>;

  constructor(private store: Store) {
    this.movies$ = this.store.select(MoviesSelectors.selectMovieList);
    this.loading$ = this.store.select(MoviesSelectors.selectMoviesLoading);
    this.currentPage$ = this.store.select(MoviesSelectors.selectMoviesCurrentPage);
    this.totalPages$ = this.store.select(MoviesSelectors.selectMoviesTotalPages);
    this.currentQuery$ = this.store.select(MoviesSelectors.selectMoviesCurrentQuery);

    this.favoriteIds$ = this.store.select(FavoritesSelectors.selectFavoriteIds);
  }

  ngOnInit() {
    this.store.dispatch(MoviesActions.loadPopularMovies({ query: '', page: 1 }));
  }

  public onPageChange(page: number): void {
    this.currentQuery$.pipe(take(1)).subscribe((query) => {
      this.store.dispatch(MoviesActions.loadPopularMovies({ query, page }));
    });
  }

  public onSearch(query: string): void {
    this.store.dispatch(MoviesActions.loadPopularMovies({ query, page: 1 }));
  }

  public onToggleFavorite(movieId: number, isCurrentlyFavorite: boolean) {
    if (isCurrentlyFavorite) {
      this.store.dispatch(FavoritesActions.removeFavorite({ id: movieId }));
    } else {
      this.store.dispatch(FavoritesActions.addFavorite({ id: movieId }));
    }
  }

  public isMovieFavorite(movieId: number, favoriteIds: number[] | null): boolean {
    return !!favoriteIds && favoriteIds.includes(movieId);
  }
}
