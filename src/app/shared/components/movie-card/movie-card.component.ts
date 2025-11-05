import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/core/models/movie.model';

@Component({
  selector: 'sh-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() isFavorite: boolean = false;
  @Output() toggleFavorite = new EventEmitter<number>();

  constructor(private router: Router) {}

  public get posterUrl(): string {
    return this.movie.poster_path
      ? `https://image.tmdb.org/t/p/w342${this.movie.poster_path}`
      : 'https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg';
  }

  public onToggleFavorite(): void {
    this.toggleFavorite.emit(this.movie.id);
  }

  public goToDetails(): void {
    this.router.navigate(['/movies', this.movie.id]);
  }
}
