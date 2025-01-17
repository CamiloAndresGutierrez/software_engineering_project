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
import { NewTestComponent } from './user-profile/new-test/new-test.component';
import { CitizenTestComponent } from './user-profile/citizen-test/citizen-test.component';
import { HETestHistoryComponent } from './user-profile/he-test-history/he-test-history.component';
import { CitizenVisitComponent } from './user-profile/citizen-visit/citizen-visit.component';
import { EstablishmentVisitComponent } from './user-profile/establishment-visit/establishment-visit.component';
import { EstablishmentProfileComponent } from './user-profile/establishment-profile/establishment-profile.component';
import { CitizenProfileComponent } from './user-profile/citizen-profile/citizen-profile.component';
import { HealthEntityProfileComponent } from './user-profile/health-entity-profile/health-entity-profile.component';
import { AdminProfileComponent } from './user-profile/admin-profile/admin-profile.component';
import { AdminReportsComponent } from './user-profile/admin-reports/admin-reports.component';
import { VisitReportComponent } from './user-profile/visit-report/visit-report.component';
import { TestReportComponent } from './user-profile/test-report/test-report.component';
import { CitizenReportComponent } from './user-profile/citizen-report/citizen-report.component';
import { EstablishmentReportComponent } from './user-profile/establishment-report/establishment-report.component';
import { HealthEntityReportComponent } from './user-profile/health-entity-report/health-entity-report.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CitizenQrGenerationComponent } from './user-profile/citizen-qr-generation/citizen-qr-generation.component';
import { QrReaderComponent } from './user-profile/qr-reader/qr-reader.component';


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
    UntimelyVisitComponent,
    NewTestComponent,
    CitizenTestComponent,
    HETestHistoryComponent,
    CitizenVisitComponent,
    EstablishmentVisitComponent,
    EstablishmentProfileComponent,
    CitizenProfileComponent,
    HealthEntityProfileComponent,
    AdminProfileComponent,
    AdminReportsComponent,
    VisitReportComponent,
    TestReportComponent,
    CitizenReportComponent,
    EstablishmentReportComponent,
    HealthEntityReportComponent,
    CitizenQrGenerationComponent,
    QrReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxQRCodeModule,
  ],
  providers: [
    DashboardGuard,
    MainGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
