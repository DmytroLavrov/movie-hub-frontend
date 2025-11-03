import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { FavoritesListComponent } from './pages/favorites-list/favorites-list.component';
import { StoreModule } from '@ngrx/store';
import { favoritesReducer } from './store/favorites.reducer';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FavoritesComponent, FavoritesListComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule,
    StoreModule.forFeature('favorites', favoritesReducer),
  ],
})
export class FavoritesModule {}
