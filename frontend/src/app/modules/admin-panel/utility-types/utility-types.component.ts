import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {NotificationService} from "../../../services/notification.service";
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Base} from "../../../services/destroy.service";
import {takeUntil} from "rxjs";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {UtilityType} from "../../../models/utility-type.model";
import {UtilityTypeService} from "../../../services/utility-type.service";
import {CreateUtilityTypeComponent} from "./create-utility-type/create-utility-type.component";
import {UpdateUtilityTypeComponent} from "./update-utility-type/update-utility-type.component";

@Component({
  selector: 'app-utility-types',
  templateUrl: './utility-types.component.html',
  styleUrls: ['./utility-types.component.scss']
})
export class UtilityTypesComponent extends Base implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'action'];

  categoriesDataSource!: MatTableDataSource<any>;
  utilityTypes!: UtilityType[];

  constructor(private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private utilityTypeService: UtilityTypeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllUtilityTypes();
  }

  getAllUtilityTypes() {
    this.utilityTypeService.getUtilityTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((utilityTypes) => {
        this.categoriesDataSource = new MatTableDataSource(utilityTypes);
        this.categoriesDataSource.paginator = this.paginator;
        this.categoriesDataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categoriesDataSource.filter = filterValue.trim().toLowerCase();

    if (this.categoriesDataSource.paginator) {
      this.categoriesDataSource.paginator.firstPage();
    }
  }

  createCategory() {
    this.dialog.open(CreateUtilityTypeComponent, {
      width: '35%'
    }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value === 'update') {
          this.getAllUtilityTypes();
        }
      });
  }

  updateCategory(utilityType: UtilityType) {
    this.dialog.open(UpdateUtilityTypeComponent, {
      width: '35%',
      data: utilityType
    }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value === 'update') {
          this.getAllUtilityTypes();
        }
      });
  }

  deleteUtilityType(utilityType: UtilityType) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Підтвердження',
        message: 'Ви впевнені що хочете видалити цей тип?'
      }
    });

    dialog.afterClosed().subscribe((isDelete: boolean) => {
      if (isDelete) {
        this.utilityTypeService.deleteUtilityType(utilityType.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
              this.notificationService.showSuccessMessage(`Комунальний тип було успішно видалено.`);
              this.getAllUtilityTypes();
            }
          )
      }
    });
  }
}
