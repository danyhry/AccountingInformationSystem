import {Component, OnInit, ViewChild} from '@angular/core';
import {IncomeService} from "../../services/income.service";
import {Income} from "../../models/income";
import {FormBuilder} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Base} from "../../services/destroy.service";
import {UpdateIncomeComponent} from "./update-income/update-income.component";
import {CreateIncomeComponent} from "./create-income/create-income.component";
import {UserService} from "../../services/user.service";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {ConfirmationDialogComponent} from "../../modules/confirmation-dialog/confirmation-dialog.component";
import {NotificationService} from "../../services/notification.service";
import {jsPDF} from 'jspdf';
import autoTable from "jspdf-autotable";

export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent extends Base implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isAuthenticated!: boolean;

  incomes: Income[] = [];

  totalIncome = 0;

  dataSource!: MatTableDataSource<Income>;

  displayedColumns: string[] = ['category', 'amount', 'date', 'description', 'action'];

  categories: Category[] = [];

  userId!: number;

  constructor(private incomeService: IncomeService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private userService: UserService,
              private categoryService: CategoryService,
              private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe();
    this.isAuthenticated = this.userService.isAuthenticated();
    this.getUpdatedIncomes();
    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  deleteIncome(income: Income): void {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Підтвердження',
        message: 'Ви дійсно хочете видалити цей дохід?'
      }
    });
    dialog.afterClosed().subscribe((isDelete: boolean) => {
      if (isDelete) {
        this.incomeService.deleteIncome(income.id).subscribe(() => {
          this.notificationService.showSuccessMessage(`Дохід успішно видалено.`);
          this.getUpdatedIncomes();
        });
      }
    });
  }

  private getUpdatedIncomes() {
    this.userId = this.userService.getUserFromStorage().id;

    this.incomeService.getIncomesByUserId(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(incomes => {
        this.incomes = incomes;
        this.totalIncome = this.incomes.reduce((total, income) => total + income.amount, 0);
        this.dataSource = new MatTableDataSource(this.incomes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }

  updateIncome(income: Income): void {
    this.dialog.open(UpdateIncomeComponent, {
      width: '35%',
      data: income
    }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value === 'update') {
          this.getUpdatedIncomes();
        }
      });
  }

  createIncome(): void {
    this.dialog.open(CreateIncomeComponent, {
      width: '35%'
    }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value === 'update') {
          this.getUpdatedIncomes();
        }
      });
  }

  getCategoryName(categoryId: number) {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }


  exportPDF() {
    // Initialize jsPDF
    const doc = new jsPDF("p", "mm", "a4");


    // Define columns and rows for the table
    const columns = ['Категорія', 'Кількість', 'Дата', 'Опис'];
    let rows: any[][] = [];

    const sortedIncomes = this.dataSource.filteredData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    sortedIncomes.forEach((income) => {
      const category = this.getCategoryName(income.categoryId);
      const amount = income.amount;
      const date = new Date(income.date);
      const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const description = income.description;
      rows.push([category, amount, formattedDate, description]);
    });
    console.log(rows);
    autoTable(doc, {
      head: [columns],
      body: rows
    });

    doc.save('Доходи.pdf');
  }


}
