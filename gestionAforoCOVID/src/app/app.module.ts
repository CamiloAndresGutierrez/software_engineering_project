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
    HealthEntityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
