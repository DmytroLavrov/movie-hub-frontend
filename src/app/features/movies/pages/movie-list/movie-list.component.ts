import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable, Subject, take, takeUntil } from 'rxjs';
import { Movie } from 'src/app/core/models/movie.model';
import * as MoviesActions from '../../store/movies.actions';
import * as MoviesSelectors from '../../store/movies.selectors';
import * as FavoritesActions from '../../../favorites/store/favorites.actions';
import * as FavoritesSelectors from '../../../favorites/store/favorites.selectors';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements OnInit, OnDestroy {
  public movies$!: Observable<Movie[]>;
  public loading$!: Observable<boolean>;
  public currentPage$!: Observable<number>;
  public totalPages$!: Observable<number>;
  public currentQuery$!: Observable<string>;
  public favoriteIds$: Observable<number[]>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.movies$ = this.store.select(MoviesSelectors.selectMovieList);
    this.loading$ = this.store.select(MoviesSelectors.selectMoviesLoading);
    this.currentPage$ = this.store.select(MoviesSelectors.selectMoviesCurrentPage);
    this.totalPages$ = this.store.select(MoviesSelectors.selectMoviesTotalPages);
    this.currentQuery$ = this.store.select(MoviesSelectors.selectMoviesCurrentQuery);

    this.favoriteIds$ = this.store.select(FavoritesSelectors.selectFavoriteIds);
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const query = params['query'] || '';
      const page = Number(params['page']) || 1;

      this.store.dispatch(MoviesActions.loadPopularMovies({ query, page }));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onPageChange(page: number): void {
    this.currentQuery$.pipe(take(1)).subscribe((query) => {
      this.updateUrl(query, page);
    });
  }

  public onSearch(query: string): void {
    this.updateUrl(query, 1);
  }

  private updateUrl(query: string, page: number): void {
    const queryParams: { query?: string; page: number } = { page: page };
    if (query) {
      queryParams['query'] = query;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
  }

  public onToggleFavorite(movieId: number, isCurrentlyFavorite: boolean) {
    if (isCurrentlyFavorite) {
      this.store.dispatch(FavoritesActions.removeFavorite({ id: movieId }));
    } else {
      this.movies$
        .pipe(
          take(1),
          map((movies) => movies.find((m) => m.id === movieId)),
          filter((movie): movie is Movie => !!movie), // Check for existence
        )
        .subscribe((movie) => {
          this.store.dispatch(FavoritesActions.addFavorite({ movie }));
        });
    }
  }

  public isMovieFavorite(movieId: number, favoriteIds: number[] | null): boolean {
    return !!favoriteIds && favoriteIds.includes(movieId);
  }
}
