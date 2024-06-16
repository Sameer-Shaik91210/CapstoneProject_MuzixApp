import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { FavouritesComponent } from './home/favourites/favourites.component';
import { RecommendedComponent } from './home/recommended/recommended.component';
import { PlayComponent } from './movie/play/play.component';
import { HeaderSidenavComponent } from './header-sidenav/header-sidenav.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path:'dashboard',component: HeaderSidenavComponent},
  { path: 'login', component: LoginComponent },
  { path: 'favorite-movies', component: FavouritesComponent },
  { path: 'recommended-movies', component: RecommendedComponent },
  { path: 'movie/:id', component: PlayComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
