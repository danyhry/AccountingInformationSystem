import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ComponentsModule} from "./components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {AppRoutingModule} from "./app-routing.module";
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import {TokenInterceptor} from "./interceptor/token.interceptor";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from "./shared/shared.module";
import { CategoriesComponent } from './pages/admin-panel/categories/categories.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel/admin-panel.component';
import {AdminLayoutModule} from "./layouts/admin-layout/admin-layout.module";
import { CreateCategoryComponent } from './pages/admin-panel/categories/create-category/create-category.component';
import { UpdateCategoryComponent } from './pages/admin-panel/categories/update-category/update-category.component';

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, CategoriesComponent, AdminPanelComponent, CreateCategoryComponent, UpdateCategoryComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        ComponentsModule,
        FontAwesomeModule,
        SharedModule,
        AdminLayoutModule,
    ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
