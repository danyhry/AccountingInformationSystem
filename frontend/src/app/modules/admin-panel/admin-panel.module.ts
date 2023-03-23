import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserComponent} from "./users/user.component";
import {EditUserComponent} from "./users/edit-user/edit-user.component";
import {CreateUserComponent} from "./users/create-user/create-user.component";
import {AdminPanelComponent} from "./admin-panel.component";
import {CategoriesComponent} from "./categories/categories.component";
import {CreateCategoryComponent} from "./categories/create-category/create-category.component";
import {UpdateCategoryComponent} from "./categories/update-category/update-category.component";
import {CreateUtilityTypeComponent} from "./utility-types/create-utility-type/create-utility-type.component";
import {UpdateUtilityTypeComponent} from "./utility-types/update-utility-type/update-utility-type.component";
import {UtilityTypesComponent} from "./utility-types/utility-types.component";


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AdminPanelComponent,
    UserComponent,
    EditUserComponent,
    CreateUserComponent,
    CategoriesComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    UtilityTypesComponent,
    CreateUtilityTypeComponent,
    UpdateUtilityTypeComponent
  ],
  exports: [
    AdminPanelComponent,
    UserComponent,
    EditUserComponent,
    CreateUserComponent,
    CategoriesComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent
  ],
  providers: []
})
export class AdminPanelModule {
}
