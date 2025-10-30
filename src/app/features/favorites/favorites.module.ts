import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { FavoritesListComponent } from './pages/favorites-list/favorites-list.component';

@NgModule({
  declarations: [FavoritesComponent, FavoritesListComponent],
  imports: [CommonModule, FavoritesRoutingModule],
})
export class FavoritesModule {}
