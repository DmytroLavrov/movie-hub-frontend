import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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

  public get posterUrl(): string {
    return this.movie.poster_path
      ? `https://image.tmdb.org/t/p/w342${this.movie.poster_path}`
      : 'https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg';
  }
}
