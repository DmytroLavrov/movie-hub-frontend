import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MovieCardComponent, SearchBarComponent, PaginationComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [MovieCardComponent, SearchBarComponent, PaginationComponent, CommonModule],
})
export class SharedModule {}
