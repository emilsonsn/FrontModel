import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/session/session.module').then(m => m.SessionModule),
    // canMatch: [IsAuthenticatedGuard]
  },
  {
    path: 'painel',
    loadChildren: () => import('./views/private/private.module').then(m => m.PrivateModule),
    //canMatch: [IsAuthenticatedGuard]
  },
  {
		path: '**',
		redirectTo: environment.home
	}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { anchorScrolling: 'enabled'}),
    BrowserModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
