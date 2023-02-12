import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminLayoutRoutes} from "./admin-layout.routing";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DashboardComponent} from "../../pages/dashboard/dashboard.component";
import {UserComponent} from "../../pages/user/user.component";
import {TablesComponent} from "../../pages/tables/tables.component";
import {SharedModule} from "../../shared/shared.module";
import {EditUserComponent} from "../../pages/user/edit-user/edit-user.component";
import {ProfileComponent} from "../../pages/profile/profile.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    EditUserComponent,
    TablesComponent,
    ProfileComponent
  ],
  providers: [NgbActiveModal]
})
export class AdminLayoutModule {
}
