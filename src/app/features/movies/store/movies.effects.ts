import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MovieApiService } from 'src/app/core/services/movie-api.service';
import * as MoviesActions from './movies.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { MovieResponse } from 'src/app/core/models/movie.model';

@Injectable()
export class MoviesEffects {
  private actions$ = inject(Actions);
  constructor(private movieApiService: MovieApiService) {}

  public loadPopular$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadPopularMovies),
      switchMap(({ query, page }) => {
        // Logic for choosing: popular or search
        const apiCall = query
          ? this.movieApiService.searchMovies(query, page)
          : this.movieApiService.getPopularMovies(page);

        return apiCall.pipe(
          map((res: MovieResponse) =>
            MoviesActions.loadPopularMoviesSuccess({
              movies: res.results,
              currentPage: res.page,
              totalPages: res.total_pages,
            }),
          ),
          catchError((error) => of(MoviesActions.loadPopularMoviesFailure({ error }))),
        );
      }),
    ),
  );

  public loadDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovieDetail),
      switchMap(({ id }) =>
        this.movieApiService.getMovieDetails(id).pipe(
          map((movie: any) => MoviesActions.loadMovieDetailSuccess({ movie })),
          catchError((error) => of(MoviesActions.loadMovieDetailFailure({ error }))),
        ),
      ),
    ),
  );
}
