import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {RecoveryFormComponent} from "./components/recovery/recovery.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoveryFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: []
})
export class AuthModule {
}
