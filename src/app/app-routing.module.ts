import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'movies', loadChildren: () => import('./features/movies/movies.module').then(m => m.MoviesModule) }, { path: 'favorites', loadChildren: () => import('./features/favorites/favorites.module').then(m => m.FavoritesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
