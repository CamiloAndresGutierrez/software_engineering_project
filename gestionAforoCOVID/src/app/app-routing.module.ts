import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard, CitizenGuard, DashboardGuard , EstablishmentGuard, HealthEntityGuard, MainGuard } from './authentication.guard';
import { LangingPageComponent } from './landing-page/langing-page/langing-page.component';
import { MainComponent } from './landing-page/main/main.component';
import { AccountStateComponent } from './user-profile/account-state/account-state.component';
import { AdminProfileComponent } from './user-profile/admin-profile/admin-profile.component';
import { CheckRegistrationComponent } from './user-profile/check-registration/check-registration.component';
import { CitizenProfileComponent } from './user-profile/citizen-profile/citizen-profile.component';
import { CitizenTestComponent } from './user-profile/citizen-test/citizen-test.component';
import { CitizenVisitComponent } from './user-profile/citizen-visit/citizen-visit.component';
import { CreateAdminComponent } from './user-profile/create-admin/create-admin.component';
import { EstablishmentProfileComponent } from './user-profile/establishment-profile/establishment-profile.component';
import { EstablishmentVisitComponent } from './user-profile/establishment-visit/establishment-visit.component';
import { HETestHistoryComponent } from './user-profile/he-test-history/he-test-history.component';
import { HealthEntityProfileComponent } from './user-profile/health-entity-profile/health-entity-profile.component';
import { ManualVisitComponent } from './user-profile/manual-visit/manual-visit.component';
import { NewTestComponent } from './user-profile/new-test/new-test.component';
import { ParametersComponent } from './user-profile/parameters/parameters.component';
import { UntimelyVisitComponent } from './user-profile/untimely-visit/untimely-visit.component';
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
        canActivate : [AdminGuard]
      },
      {
        path : "new-admin",
        component : CreateAdminComponent,
        canActivate : [AdminGuard]
      },
      {
        path : "parameters",
        component : ParametersComponent,
        canActivate : [AdminGuard]
      },
      {
        path: "accounts",
        component : AccountStateComponent,
        canActivate : [AdminGuard]
      },
      {
        path : "manual-visit",
        component : ManualVisitComponent,
        canActivate: [EstablishmentGuard]
      },
      {
        path : "untimely-visit",
        component : UntimelyVisitComponent,
        canActivate: [EstablishmentGuard]
      },
      {
        path : "new-test",
        component : NewTestComponent,
        canActivate : [HealthEntityGuard],
      },
      {
        path : "citizen-test",
        component : CitizenTestComponent,
        canActivate : [CitizenGuard]
      },
      {
        path : "HE-test",
        component : HETestHistoryComponent,
        canActivate : [HealthEntityGuard],
      },
      {
        path: "citizen-visit",
        component : CitizenVisitComponent,
        canActivate : [CitizenGuard]
      },
      {
        path : "establishment-visit",
        component : EstablishmentVisitComponent,
        canActivate: [EstablishmentGuard]
      },
      {
        path : "establishment-profile",
        component : EstablishmentProfileComponent,
        canActivate: [EstablishmentGuard]
      },
      {
        path : "citizen-profile",
        component : CitizenProfileComponent,
        canActivate: [CitizenGuard]
      },
      {
        path : "health-profile",
        component : HealthEntityProfileComponent,
        canActivate: [HealthEntityGuard]
      },
      {
        path : "admin-profile",
        component : AdminProfileComponent,
        canActivate: [AdminGuard]
      }

  ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
