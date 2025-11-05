import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/core/models/movie.model';
import * as FavoritesSelectors from '../../store/favorites.selectors';
import * as FavoritesActions from '../../store/favorites.actions';

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

  constructor(private store: Store) {
    this.favoriteIds$ = this.store.select(FavoritesSelectors.selectFavoriteIds);
  }

  ngOnInit(): void {
    this.favoriteMovies$ = this.store.select(FavoritesSelectors.selectFavoriteMovies);
  }

  public onRemoveFavorite(movieId: number): void {
    this.store.dispatch(FavoritesActions.removeFavorite({ id: movieId }));
  }
}
