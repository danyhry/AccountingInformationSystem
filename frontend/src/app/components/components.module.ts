import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {SharedModule} from "../shared/shared.module";
import {FooterComponent} from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [SidebarComponent, FooterComponent],
  exports: [SidebarComponent, FooterComponent]
})

export class ComponentsModule {
}
