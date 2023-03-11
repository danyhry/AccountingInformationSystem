import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {NgModule} from "@angular/core";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {CanvasJSChart} from "../../assets/canvasjs/canvasjs.angular.component";
import {NgStyle} from "@angular/common";
import {MatTabsModule} from "@angular/material/tabs";
import {NgChartsModule} from "ng2-charts";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  NativeDateModule
} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {MY_DATE_FORMAT} from "../pages/incomes/incomes.component";
import {CustomDatePipe} from "../utils/CustomDatePipe";
import {NgxChartsModule, TooltipModule} from "@swimlane/ngx-charts";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CanvasJSChart,
    CustomDatePipe
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatSortModule,
    MatTooltipModule,
    MatSidenavModule,
    MatExpansionModule,
    NgStyle,
    MatTabsModule,
    NgChartsModule,
    NativeDateModule,
    NgxChartsModule,
    MatCardModule,
    MatDatepickerModule,
    MatMomentDateModule,
    TooltipModule,
    FormsModule,
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatSortModule,
    MatTooltipModule,
    MatSidenavModule,
    MatExpansionModule,
    CanvasJSChart,
    MatTabsModule,
    NgChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    CustomDatePipe,
    NgxChartsModule,
    MatCardModule,
    MatDatepickerModule,
    TooltipModule,
    FormsModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class SharedModule {
}
