import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ComponentsModule} from "./components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {AppRoutingModule} from "./app-routing.module";
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import {TokenInterceptor} from "./interceptor/token.interceptor";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatSidenavModule} from "@angular/material/sidenav";
import {SharedModule} from "./shared/shared.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {SettingsComponent} from './pages/settings/settings.component';
import {ProfileComponent} from './pages/profile/profile.component';

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, SettingsComponent, ProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ComponentsModule,
    FontAwesomeModule,
    MatSidenavModule,
    SharedModule,
    MatExpansionModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
