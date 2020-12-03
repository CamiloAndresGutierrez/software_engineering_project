import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LangingPageComponent } from './landing-page/langing-page/langing-page.component';
import { NavbarComponent } from './landing-page/navbar/navbar.component';
import { MainComponent } from './landing-page/main/main.component';
import { UserOptionsMainComponent } from './user/user-options-main/user-options-main.component';
import { UserOptionsNavbarComponent } from './user/user-options-navbar/user-options-navbar.component';
import { UserOptionsRegistrationComponent } from './user/user-options-registration/user-options-registration.component';
import { UserOptionsLoginComponent } from './user/user-options-login/user-options-login.component';
import { FooterComponent } from './landing-page/footer/footer.component';
import { CitizenComponent } from './user/user-options-registration/citizen/citizen.component';
import { EstablishmentComponent } from './user/user-options-registration/establishment/establishment.component';
import { HealthEntityComponent } from './user/user-options-registration/health-entity/health-entity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserNavbarComponent } from './user-profile/user-navbar/user-navbar.component';
import { UserDashboardComponent } from './user-profile/user-dashboard/user-dashboard.component';
import { DashboardGuard, MainGuard } from './authentication.guard';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { CheckRegistrationComponent } from './user-profile/check-registration/check-registration.component';
import { CreateAdminComponent } from './user-profile/create-admin/create-admin.component';
import { ParametersComponent } from './user-profile/parameters/parameters.component';
import { AccountStateComponent } from './user-profile/account-state/account-state.component';
import { ManualVisitComponent } from './user-profile/manual-visit/manual-visit.component';
import { UntimelyVisitComponent } from './user-profile/untimely-visit/untimely-visit.component';


@NgModule({
  declarations: [
    AppComponent,
    LangingPageComponent,
    NavbarComponent,
    MainComponent,
    UserOptionsMainComponent,
    UserOptionsNavbarComponent,
    UserOptionsRegistrationComponent,
    UserOptionsLoginComponent,
    FooterComponent,
    CitizenComponent,
    EstablishmentComponent,
    HealthEntityComponent,
    UserNavbarComponent,
    UserDashboardComponent,
    CheckRegistrationComponent,
    CreateAdminComponent,
    ParametersComponent,
    AccountStateComponent,
    ManualVisitComponent,
    UntimelyVisitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DashboardGuard,
    MainGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
