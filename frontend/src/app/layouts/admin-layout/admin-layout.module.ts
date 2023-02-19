import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminLayoutRoutes} from "./admin-layout.routing";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DashboardComponent} from "../../pages/dashboard/dashboard.component";
import {UserComponent} from "../../pages/user/user.component";
import {IdeasComponent} from "../../pages/ideas/ideas.component";
import {SharedModule} from "../../shared/shared.module";
import {EditUserComponent} from "../../pages/user/edit-user/edit-user.component";
import {ProfileComponent} from "../../pages/profile/profile.component";
import {IncomesComponent} from "../../pages/incomes/incomes.component";
import {ExpansesComponent} from "../../pages/expanses/expanses.component";
import {FaqComponent} from "../../pages/faq/faq.component";
import {ContactComponent} from "../../pages/contact/contact.component";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatCardModule,
    MatDatepickerModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    EditUserComponent,
    IdeasComponent,
    ProfileComponent,
    IncomesComponent,
    ExpansesComponent,
    FaqComponent,
    ContactComponent
  ],
  providers: [NgbActiveModal]
})
export class AdminLayoutModule {
}
