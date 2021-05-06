import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PublicPageComponent } from './components/public-page/public-page.component';
import { RestrictedPageComponent } from './components/restricted-page/restricted-page.component';
import { MaslGuard } from './guards/masl.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'public',
    component: PublicPageComponent
  },
  {
    path: 'restricted',
    component: RestrictedPageComponent,
    canActivate: [MaslGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
