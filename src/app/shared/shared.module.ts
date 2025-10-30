import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [MovieCardComponent, SearchBarComponent, PaginationComponent],
  imports: [CommonModule],
  exports: [MovieCardComponent, SearchBarComponent, CommonModule],
})
export class SharedModule {}
