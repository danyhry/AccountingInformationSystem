import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
    imports: [CommonModule, RouterModule, NgbModule, MatToolbarModule, MatButtonModule, MatDividerModule, MatSidenavModule, MatIconModule, MatMenuModule],
  declarations: [SidebarComponent, NavbarComponent],
  exports: [SidebarComponent, NavbarComponent]
})

export class ComponentsModule {
}
