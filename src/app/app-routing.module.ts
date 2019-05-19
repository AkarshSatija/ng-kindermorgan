import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

// const routes: Routes = [];
const routes: Routes = [
  // App routes goes here
 
  // no layout route
  { path: "", component: AppComponent },
  
  // no layout route
  { path: "list", component: ListComponent },

  // // otherwise redirect to home
  // { path: "**", component:PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
