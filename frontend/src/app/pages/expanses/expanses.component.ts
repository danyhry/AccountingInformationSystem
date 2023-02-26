import {Component, OnInit, ViewChild} from '@angular/core';
import {Base} from "../../services/destroy.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {takeUntil} from "rxjs";
import {Expense} from "../../models/expense";
import {ExpenseService} from "../../services/expense.service";
import {BudgetService} from "../../services/budget.service";
import {Category} from "../../models/category";
import {CreateExpenseComponent} from "./create-expense/create-expense.component";
import {UpdateExpenseComponent} from "./update-expense/update-expense.component";

@Component({
  selector: 'app-expanses',
  templateUrl: './expanses.component.html',
  styleUrls: ['./expanses.component.scss']
})
export class ExpansesComponent extends Base implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isAuthenticated!: boolean;

  expenses: Expense[] = [];

  totalExpense = 0;

  dataSource!: MatTableDataSource<Expense>;

  displayedColumns: string[] = ['category', 'amount', 'date', 'description', 'action'];

  categories: Category[] = [];

  userId!: number;

  constructor(private expenseService: ExpenseService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private userService: UserService,
              private budgetService: BudgetService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe();
    this.isAuthenticated = this.userService.isAuthenticated();
    this.getUpdatedExpenses();
    this.budgetService.getCategories()
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

  deleteExpense(expense: Expense): void {
    console.log(expense);
    this.expenseService.deleteExpense(expense.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getUpdatedExpenses();
      });
  }

  private getUpdatedExpenses() {
    this.userId = this.userService.getUserFromStorage().id;

    this.expenseService.getExpensesByUserId(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(expenses => {
        this.expenses = expenses;
        this.totalExpense = this.expenses.reduce((total, expense) => total + expense.amount, 0);
        this.dataSource = new MatTableDataSource(this.expenses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  updateExpense(expense: Expense): void {
    this.dialog.open(UpdateExpenseComponent, {
      width: '35%',
      data: expense
    }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value === 'update') {
          this.getUpdatedExpenses();
        }
      });
  }

  createExpense(): void {
    this.dialog.open(CreateExpenseComponent, {
      width: '35%'
    }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        console.log(value);
        if (value === 'update') {
          this.getUpdatedExpenses();
        }
      });
  }

  getCategoryName(categoryId: number) {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }


}
