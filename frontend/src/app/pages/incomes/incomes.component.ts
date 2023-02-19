import {Component, OnInit, ViewChild} from '@angular/core';
import {IncomeService} from "../../services/income.service";
import {Income} from "../../models/income";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Base} from "../../services/destroy.service";
import {UpdateIncomeComponent} from "./update-income/update-income.component";


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

  incomes: Income[] = [];

  totalIncome = 0;

  incomesForm!: FormGroup;

  dataSource!: MatTableDataSource<Income>;

  displayedColumns: string[] = ['description', 'amount', 'category', 'date', 'action'];

  constructor(private incomeService: IncomeService,
              private fb: FormBuilder,
              private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.getUpdatedIncomes();

    this.incomesForm = this.fb.group({
      id: [''],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+([,.][0-9]{1,2})?$')]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', [Validators.required, Validators.maxLength(30)]],
      date: ['', [Validators.required]],
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
    console.log(income);
    this.incomeService.deleteIncome(income.id).subscribe(() => {
      this.getUpdatedIncomes();
    });
  }

  private getUpdatedIncomes() {
    this.incomeService.getIncomes().subscribe(incomes => {
      this.incomes = incomes;
      this.totalIncome = this.incomes.reduce((total, income) => total + income.amount, 0);
      this.dataSource = new MatTableDataSource(this.incomes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onIncomeSubmit(): void {
    const newIncome: Income = {
      id: this.incomesForm.controls['id'].value,
      amount: this.incomesForm.controls['amount'].value,
      description: this.incomesForm.controls['description'].value,
      category: this.incomesForm.controls['category'].value,
      date: this.incomesForm.controls['date'].value.toISOString().substring(0, 10)
    };
    this.incomeService.addIncome(newIncome).subscribe(() => {
      this.getUpdatedIncomes();
    });

    this.incomesForm.reset();
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

}
