import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MovieCardComponent, SearchBarComponent, PaginationComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [MovieCardComponent, SearchBarComponent, PaginationComponent, CommonModule],
})
export class SharedModule {}
