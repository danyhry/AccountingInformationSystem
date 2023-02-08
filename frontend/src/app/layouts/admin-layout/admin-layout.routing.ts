import {Routes} from "@angular/router";
import {DashboardComponent} from "../../pages/dashboard/dashboard.component";
import {UserComponent} from "../../pages/user/user.component";
import {TablesComponent} from "../../pages/tables/tables.component";
import {LoginComponent} from "../../modules/auth/components/login/login.component";
import {RegisterComponent} from "../../modules/auth/components/register/register.component";

export const AdminLayoutRoutes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: "users", component: UserComponent},
  {path: "tables", component: TablesComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent}
];
