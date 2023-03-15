import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ComponentsModule} from "./components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {AppRoutingModule} from "./app-routing.module";
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import {TokenInterceptor} from "./interceptor/token.interceptor";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from "./shared/shared.module";
import {AdminLayoutModule} from "./layouts/admin-layout/admin-layout.module";

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ComponentsModule,
    FontAwesomeModule,
    SharedModule,
    AdminLayoutModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
