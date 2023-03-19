import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Income} from "../../models/income";
import {IncomeService} from "../../services/income.service";
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {UserService} from "../../services/user.service";
import {forkJoin, takeUntil} from "rxjs";
import {Base} from "../../services/destroy.service";
import {ExpenseService} from "../../services/expense.service";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {Expense} from "../../models/expense";
import {FormControl} from "@angular/forms";
import {MatDatepicker} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {DATE_MONTH_FORMATS} from "../../models/const/date-month-format.const";
import * as moment from "moment/moment";
import {Moment} from "moment/moment";

@Component({
  selector: "app-dashboard",
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: "dashboard.component.html",
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: DATE_MONTH_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent extends Base implements OnInit {
  isAuthenticated!: boolean;

  userId!: number;

  selectedIncomeFilter = 'total';
  selectedExpenseFilter = 'total';

  totalExpenseCurrentMonth!: number;
  totalExpenseCurrentYear!: number;
  totalExpense!: number;

  totalIncomeCurrentMonth!: number;
  totalIncomeCurrentYear!: number;
  totalIncome!: number;

  currentMonthBudget!: number;
  currentYearBudget!: number;
  totalBudget!: number;

  categories: Category[] = [];

  date = new FormControl(moment());

  incomesData: { name: string; value: number; }[] = [];
  expensesData: { name: string; value: number }[] = [];
  pieChartIncomesData: { name: string; value: number; }[] = [];
  pieChartExpensesData: { name: string; value: number; }[] = [];
  gradient = false;
  colorScheme: Color = {
    name: 'Black',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#2CC2C7FF', '#932CC7FF']
  };
  incomes!: Income[];
  expenses!: Expense[];
  combinedData!: any[];


  constructor(private incomeService: IncomeService,
              private userService: UserService,
              private expenseService: ExpenseService,
              private categoryService: CategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserFromStorage().id;
    this.isAuthenticated = this.userService.isAuthenticated();

    // this.currentMonth = new Date().toLocaleString('default', {month: 'long'});

    this.fetchCategories();

    // this.getIncomesByCurrentMonth();
    // this.getExpensesByCurrentMonth();

    // this.getIncomesAndExpensesByMonth();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    this.getIncomesAndExpensesByMonth(currentMonth, currentYear);

  }

  private fetchCategories() {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  private getCombinedChartData(): void {
    const combinedData: any[] = [];

    this.incomesData.forEach(income => {
      const expense = this.expensesData.find(expense => expense.name === income.name);
      combinedData.push({
        name: income.name,
        value: income.value - (expense ? expense.value : 0)
      });
    });

    this.expensesData.forEach(expense => {
      const income = this.incomesData.find(income => income.name === expense.name);
      if (!income) {
        combinedData.push({
          name: expense.name,
          value: -expense.value
        });
      }
    });

    this.combinedData = combinedData;
  }

  calculateBudget(): void {
    this.totalBudget = this.totalIncome - this.totalExpense;
    this.currentMonthBudget = this.totalIncomeCurrentMonth - this.totalExpenseCurrentMonth;
    this.currentYearBudget = this.totalIncomeCurrentYear - this.totalExpenseCurrentYear;
  }

  private calculateTotal(data: Income[] | Expense[]) {
    return data.reduce((sum, item) => sum + item.amount, 0);
  }

  private calculateDataByDay(data: Income[] | Expense[], currentMonth: any, currentYear: any) {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    return Array(daysInMonth).fill(0).map((_, index) => {
      const day = index + 1;
      const filteredData = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === currentMonth && itemDate.getDate() === day;
      });
      const totalAmount = this.calculateTotal(filteredData);
      return ({name: `${day}`, value: totalAmount});
    });
  }

  private calculateCategoryAmounts(data: Income[] | Expense[]) {
    const categoryAmounts: { [key: number]: number } = {};
    data.forEach(item => {
      const categoryId = item.categoryId;
      if (!categoryAmounts[categoryId]) {
        categoryAmounts[categoryId] = 0;
      }
      categoryAmounts[categoryId] += item.amount;
    });

    return this.categories.map(category => {
      const categoryId = category.id;
      const categoryName = category.name;
      const totalAmount = categoryAmounts[categoryId] || 0;
      return {name: categoryName, value: totalAmount};
    });
  }

  dataLabelFormatting = (value: number | null) => {
    if (value === 0 || value === null) {
      return null;
    } else {
      return value;
    }
  }

  getFilteredIncomes() {
    let incomes: Income[];
    switch (this.selectedIncomeFilter) {
      case 'thisMonth':
        incomes = this.incomes.filter(income => {
          const date = new Date(income.date);
          return date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
        });
        break;
      case 'thisYear':
        incomes = this.incomes.filter(income => {
          const date = new Date(income.date);
          return date.getFullYear() === new Date().getFullYear();
        });
        break;
      default:
        incomes = this.incomes;
        break;
    }

    if (incomes) {
      return incomes
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);
    } else {
      return [];
    }
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    const selectedMonth = normalizedMonthAndYear.month();
    const selectedYear = normalizedMonthAndYear.year();
    console.log(selectedMonth);
    console.log(selectedYear);
    this.getIncomesAndExpensesByMonth(selectedMonth, selectedYear);
    datepicker.close();
  }

  getFilteredExpenses() {
    let expenses: Expense[];
    switch (this.selectedExpenseFilter) {
      case 'thisMonth':
        expenses = this.expenses.filter(expense => {
          const date = new Date(expense.date);
          return date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
        });
        break;
      case 'thisYear':
        expenses = this.expenses.filter(expense => {
          const date = new Date(expense.date);
          return date.getFullYear() === new Date().getFullYear();
        });
        break;
      default:
        expenses = this.expenses;
        break;
    }

    if (expenses) {
      return expenses
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);
    } else {
      return [];
    }
  }

  getCategoryName(categoryId: number) {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }

  private getIncomesAndExpensesByMonth(selectedMonth: number, selectedYear: number): void {

    forkJoin([
      this.incomeService.getIncomesByUserId(this.userId),
      this.expenseService.getExpensesByUserId(this.userId)
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([incomes, expenses]) => {
      this.incomes = incomes;
      this.expenses = expenses;

      const selectedMonthIncomes = this.filterByMonthAndYear(incomes, selectedMonth, selectedYear);
      const selectedYearIncomes = this.filterByYear(incomes, selectedYear);

      const selectedMonthExpenses = this.filterByMonthAndYear(expenses, selectedMonth, selectedYear);
      const selectedYearExpenses = this.filterByYear(expenses, selectedYear);

      this.totalIncomeCurrentMonth = this.calculateTotal(selectedMonthIncomes);
      this.totalIncomeCurrentYear = this.calculateTotal(selectedYearIncomes);
      this.totalIncome = this.calculateTotal(incomes);

      this.totalExpenseCurrentMonth = this.calculateTotal(selectedMonthExpenses);
      this.totalExpenseCurrentYear = this.calculateTotal(selectedYearExpenses);
      this.totalExpense = this.calculateTotal(expenses);

      this.calculateBudget();

      this.incomesData = this.calculateDataByDay(selectedMonthIncomes, selectedMonth, selectedYear);
      this.pieChartIncomesData = this.calculateCategoryAmounts(selectedMonthIncomes);

      this.expensesData = this.calculateDataByDay(selectedMonthExpenses, selectedMonth, selectedYear);
      this.pieChartExpensesData = this.calculateCategoryAmounts(selectedMonthExpenses);

      this.getCombinedChartData();
    });
  }

  filterByMonthAndYear(items: Income[] | Expense[], month: number, year: number): any[] {
    return items.filter(item => {
      const date = new Date(item.date);
      return date.getMonth() === month && date.getFullYear() === year;
    });
  }

  filterByYear(items: Income[] | Expense[], year: number): any[] {
    return items.filter(item => {
      const date = new Date(item.date);
      return date.getFullYear() === year;
    });
  }

}
