import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'listuser', component: UsersComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'listuser' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
