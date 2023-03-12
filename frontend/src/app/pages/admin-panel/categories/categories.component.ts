import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {NotificationService} from "../../../services/notification.service";
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category";
import {Base} from "../../../services/destroy.service";
import {takeUntil} from "rxjs";
import {CreateCategoryComponent} from "./create-category/create-category.component";
import {ConfirmationDialogComponent} from "../../../modules/confirmation-dialog/confirmation-dialog.component";
import {UpdateCategoryComponent} from "./update-category/update-category.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends Base implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'action'];

  categoriesDataSource!: MatTableDataSource<any>;
  categories!: Category[];

  constructor(private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private categoryService: CategoryService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories) => {
        this.categoriesDataSource = new MatTableDataSource(categories);
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
    this.dialog.open(CreateCategoryComponent, {
      width: '35%'
    }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value === 'update') {
          this.getAllCategories();
        }
      });
  }

  updateCategory(category: Category) {
    this.dialog.open(UpdateCategoryComponent, {
      width: '35%',
      data: category
    }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value === 'update') {
          this.getAllCategories();
        }
      });
  }

  deleteCategory(category: Category) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Підтвердження',
        message: 'Ви впевнені що хочете видалити цю категорію?'
      }
    });

    dialog.afterClosed().subscribe((isDelete: boolean) => {
      if (isDelete) {
        this.categoryService.deleteCategory(category.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
              this.notificationService.showSuccessMessage(`Категорію було успішно видалено.`);
              this.getAllCategories();
            }
          )
      }
    });
  }
}
