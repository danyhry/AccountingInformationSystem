import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminLayoutRoutes} from "./admin-layout.routing";
import {IdeasComponent} from "../../pages/ideas/ideas.component";
import {SharedModule} from "../../shared/shared.module";
import {ProfileComponent} from "../../pages/profile/profile.component";
import {IncomesComponent} from "../../pages/incomes/incomes.component";
import {ExpansesComponent} from "../../pages/expanses/expanses.component";
import {FaqComponent} from "../../pages/faq/faq.component";
import {ContactComponent} from "../../pages/contact/contact.component";
import {UpdateIncomeComponent} from "../../pages/incomes/update-income/update-income.component";
import {CreateIncomeComponent} from "../../pages/incomes/create-income/create-income.component";
import {CreateExpenseComponent} from "../../pages/expanses/create-expense/create-expense.component";
import {UpdateExpenseComponent} from "../../pages/expanses/update-expense/update-expense.component";
import {ConfirmationDialogComponent} from "../../modules/confirmation-dialog/confirmation-dialog.component";
import {AdminPanelModule} from "../../modules/admin-panel/admin-panel.module";
import {DashboardComponent} from "../../pages/dashboard/dashboard.component";
import {UtilitiesComponent} from "../../pages/utilities/utilities.component";
import {UpdateUtilityComponent} from "../../pages/utilities/update-utility/update-utility.component";
import {CreateUtilityComponent} from "../../pages/utilities/create-utility/create-utility.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    AdminPanelModule,
  ],
  declarations: [
    DashboardComponent,
    IdeasComponent,
    ProfileComponent,
    IncomesComponent,
    ExpansesComponent,
    FaqComponent,
    ContactComponent,
    UpdateIncomeComponent,
    CreateIncomeComponent,
    CreateExpenseComponent,
    UpdateExpenseComponent,
    ConfirmationDialogComponent,
    UtilitiesComponent,
    CreateUtilityComponent,
    UpdateUtilityComponent
  ],
  exports: [],
  providers: []
})
export class AdminLayoutModule {
}
