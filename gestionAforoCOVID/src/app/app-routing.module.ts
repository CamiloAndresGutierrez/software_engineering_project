import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardGuard , MainGuard } from './authentication.guard';
import { LangingPageComponent } from './landing-page/langing-page/langing-page.component';
import { MainComponent } from './landing-page/main/main.component';
import { AccountStateComponent } from './user-profile/account-state/account-state.component';
import { CheckRegistrationComponent } from './user-profile/check-registration/check-registration.component';
import { CreateAdminComponent } from './user-profile/create-admin/create-admin.component';
import { ParametersComponent } from './user-profile/parameters/parameters.component';
import { UserDashboardComponent } from './user-profile/user-dashboard/user-dashboard.component';
import { UserOptionsLoginComponent } from './user/user-options-login/user-options-login.component';
import { UserOptionsMainComponent } from './user/user-options-main/user-options-main.component';
import { CitizenComponent } from './user/user-options-registration/citizen/citizen.component';
import { EstablishmentComponent } from './user/user-options-registration/establishment/establishment.component';
import { HealthEntityComponent } from './user/user-options-registration/health-entity/health-entity.component';
import { UserOptionsRegistrationComponent } from './user/user-options-registration/user-options-registration.component';


const routes: Routes = [
  {
    path:"",
    component: MainComponent,
    canActivate : [DashboardGuard]
  },
  {
    path:"", 
    component: UserOptionsMainComponent,
    canActivate : [DashboardGuard],
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
  },
  {
    path: "dashboard",
    component: UserDashboardComponent,
    canActivate : [MainGuard],
    children : [
      {
        path : "check-registration",
        component : CheckRegistrationComponent,
      },
      {
        path : "new-admin",
        component : CreateAdminComponent,
      },
      {
        path : "parameters",
        component : ParametersComponent,
      },
      {
        path: "accounts",
        component : AccountStateComponent
      }
  ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
