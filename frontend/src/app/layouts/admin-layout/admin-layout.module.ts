import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminLayoutRoutes} from "./admin-layout.routing";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DashboardComponent} from "../../pages/dashboard/dashboard.component";
import {UserComponent} from "../../pages/admin-panel/users/user.component";
import {IdeasComponent} from "../../pages/ideas/ideas.component";
import {SharedModule} from "../../shared/shared.module";
import {EditUserComponent} from "../../pages/admin-panel/users/edit-user/edit-user.component";
import {ProfileComponent} from "../../pages/profile/profile.component";
import {IncomesComponent} from "../../pages/incomes/incomes.component";
import {ExpansesComponent} from "../../pages/expanses/expanses.component";
import {FaqComponent} from "../../pages/faq/faq.component";
import {ContactComponent} from "../../pages/contact/contact.component";
import {UpdateIncomeComponent} from "../../pages/incomes/update-income/update-income.component";
import {CreateIncomeComponent} from "../../pages/incomes/create-income/create-income.component";
import {CreateUserComponent} from "../../pages/admin-panel/users/create-user/create-user.component";
import {CreateExpenseComponent} from "../../pages/expanses/create-expense/create-expense.component";
import {UpdateExpenseComponent} from "../../pages/expanses/update-expense/update-expense.component";
import {ConfirmationDialogComponent} from "../../modules/confirmation-dialog/confirmation-dialog.component";

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
        IdeasComponent,
        ProfileComponent,
        IncomesComponent,
        ExpansesComponent,
        FaqComponent,
        ContactComponent,
        UpdateIncomeComponent,
        CreateIncomeComponent,
        CreateUserComponent,
        CreateExpenseComponent,
        UpdateExpenseComponent,
        ConfirmationDialogComponent
    ],
    exports: [
        UserComponent
    ],
    providers: [NgbActiveModal]
})
export class AdminLayoutModule {
}
