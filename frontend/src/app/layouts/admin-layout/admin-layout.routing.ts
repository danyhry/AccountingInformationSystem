import {Routes} from "@angular/router";
import {DashboardComponent} from "../../pages/dashboard/dashboard.component";
import {IdeasComponent} from "../../pages/ideas/ideas.component";
import {LoginComponent} from "../../modules/auth/components/login/login.component";
import {RegisterComponent} from "../../modules/auth/components/register/register.component";
import {ProfileComponent} from "../../pages/profile/profile.component";
import {IncomesComponent} from "../../pages/incomes/incomes.component";
import {ExpansesComponent} from "../../pages/expanses/expanses.component";
import {FaqComponent} from "../../pages/faq/faq.component";
import {ContactComponent} from "../../pages/contact/contact.component";
import {AdminPanelComponent} from "../../modules/admin-panel/admin-panel.component";
import {UtilitiesComponent} from "../../pages/utilities/utilities.component";

export const AdminLayoutRoutes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: "incomes", component: IncomesComponent},
  {path: "expanses", component: ExpansesComponent},
  {path: "admin", component: AdminPanelComponent},
  {path: "utilities", component: UtilitiesComponent},
  {path: "ideas", component: IdeasComponent},
  {path: "faq", component: FaqComponent},
  {path: "contact", component: ContactComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "profile", component: ProfileComponent},
];
