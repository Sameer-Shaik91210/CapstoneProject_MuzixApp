import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { RecommendedMoviesComponent } from './recommended-movies/recommended-movies.component';
import { MoviesComponent } from './movies/movies.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'favorite-movies', component: FavoriteMoviesComponent },
  { path: 'recommended-movies', component: RecommendedMoviesComponent },
  { path: 'movies', component: MoviesComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
