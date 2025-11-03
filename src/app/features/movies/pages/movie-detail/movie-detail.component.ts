import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { MovieDetails } from 'src/app/core/models/movie.model';
import * as MoviesSelectors from '../../store/movies.selectors';
import * as MoviesActions from '../../store/movies.actions';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  public movie$!: Observable<MovieDetails | null>;
  public loading$!: Observable<boolean>;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.loading$ = this.store.select(MoviesSelectors.selectMoviesLoading);
    this.movie$ = this.store.select(MoviesSelectors.selectSelectedMovie);
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const movieId = Number(params.get('id'));
      if (movieId && !isNaN(movieId)) {
        this.store.dispatch(MoviesActions.loadMovieDetail({ id: movieId }));
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPosterUrl(path?: string | null): string {
    return path
      ? `https://image.tmdb.org/t/p/w780${path}`
      : 'https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg';
  }
}
