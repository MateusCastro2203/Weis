import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './page/home/home.module#HomePageModule', canActivate: [AuthGuard] 
  },
  {
    path: 'login',
    loadChildren:'./page/login/login.module#LoginPageModule'
  },
  {
    path: 'user',
    loadChildren: './page/user/user.module#UserPageModule'
  },
  {
    path: 'details',
    loadChildren: './page/details/details.module#DetailsPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    loadChildren: './page/details/details.module#DetailsPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'produto',
    loadChildren: () => import('./page/produto/produto.module').then( m => m.ProdutoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
