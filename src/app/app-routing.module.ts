import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPageComponent } from './components/public-page/public-page.component';
import { RestrictedPageComponent } from './components/restricted-page/restricted-page.component';
import { MaslGuard } from './guards/masl.guard';

const routes: Routes = [
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
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
