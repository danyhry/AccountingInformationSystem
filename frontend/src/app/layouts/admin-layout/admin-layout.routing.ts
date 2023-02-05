import {Routes} from "@angular/router";
import {DashboardComponent} from "../../pages/dashboard/dashboard.component";
import {UserComponent} from "../../pages/user/user.component";
import {TablesComponent} from "../../pages/tables/tables.component";

export const AdminLayoutRoutes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: "user", component: UserComponent},
  {path: "tables", component: TablesComponent}
];
