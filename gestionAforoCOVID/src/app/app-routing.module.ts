import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LangingPageComponent } from './landing-page/langing-page/langing-page.component';
import { MainComponent } from './landing-page/main/main.component';
import { UserOptionsLoginComponent } from './user/user-options-login/user-options-login.component';
import { UserOptionsMainComponent } from './user/user-options-main/user-options-main.component';
import { CitizenComponent } from './user/user-options-registration/citizen/citizen.component';
import { EstablishmentComponent } from './user/user-options-registration/establishment/establishment.component';
import { HealthEntityComponent } from './user/user-options-registration/health-entity/health-entity.component';
import { UserOptionsRegistrationComponent } from './user/user-options-registration/user-options-registration.component';


const routes: Routes = [
  {
    path:"", 
    component: MainComponent
  },
  {
    path:"user-options", 
    component: UserOptionsMainComponent,
    children:[
      {
        path:"registration",
        component: UserOptionsRegistrationComponent,
        children:[
          {
            path:"citizen",
            component: CitizenComponent
          },
          {
            path:"establishment",
            component: EstablishmentComponent
          },
          {
            path:"health-entity",
            component: HealthEntityComponent
          }
        ]
      },
      {
        path:"login",
        component: UserOptionsLoginComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
