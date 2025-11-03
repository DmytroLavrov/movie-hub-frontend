import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieDetails, MovieResponse } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public getPopularMovies(page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movies/popular`, {
      params: new HttpParams().set('page', page),
    });
  }

  public searchMovies(query: string, page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/search`, {
      params: new HttpParams().set('query', query).set('page', page),
    });
  }

  public getMovieDetails(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.baseUrl}/movies/${id}`);
  }
}
