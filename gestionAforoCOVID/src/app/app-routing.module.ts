import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LangingPageComponent } from './components/langing-page/langing-page.component';


const routes: Routes = [
  {
    path:"", component: LangingPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
