// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { FavouritesComponent } from './home/favourites/favourites.component';
import { RecommendedComponent } from './home/recommended/recommended.component';
import { PlayComponent } from './movie/play/play.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { authguardGuard } from './core/guards/authguard.guard';
import { CanDeactivateGuard } from './core/guards/can-deactivate.service';
import { SearchComponent } from './search/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canDeactivate: [CanDeactivateGuard] },  // Apply the guard here
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [authguardGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'favorite-movies', component: FavouritesComponent },
      { path: 'recommended-movies', component: RecommendedComponent },
      { path: 'movie/:id', component: PlayComponent },
      {path:'search', component:SearchComponent}
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
