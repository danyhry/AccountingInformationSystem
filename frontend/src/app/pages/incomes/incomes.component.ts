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
export class IncomesComponent extends Base implements OnInit{

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isAuthenticated!: boolean;

  incomes: Income[] = [];

  totalIncome = 0;

  dataSource!: MatTableDataSource<Income>;

  displayedColumns: string[] = ['description', 'amount', 'date', 'action'];

  constructor(private incomeService: IncomeService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.getUpdatedIncomes();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteIncome(income: Income): void {
    console.log(income);
    this.incomeService.deleteIncome(income.id).subscribe(() => {
      this.getUpdatedIncomes();
    });
  }

  private getUpdatedIncomes() {
    this.incomeService.getIncomes().subscribe(incomes => {
      this.incomes = incomes;
      console.log(incomes);
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
        console.log(value);
        if (value === 'update') {
          this.getUpdatedIncomes();
        }
      });
  }

}
