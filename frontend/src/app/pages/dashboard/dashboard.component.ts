import {Component, OnInit} from "@angular/core";
import {Income} from "../../models/income";
import {IncomeService} from "../../services/income.service";
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {UserService} from "../../services/user.service";
import {takeUntil} from "rxjs";
import {Base} from "../../services/destroy.service";
import {ExpenseService} from "../../services/expense.service";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: "app-dashboard",
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent extends Base implements OnInit {
  isAuthenticated!: boolean;

  expensesData: { name: string; value: number }[] = [];
  incomesData: { name: string; value: number; }[] = [];
  userId: number = this.userService.getUserFromStorage().id;
  pieChartIncomesData: { name: string; value: number; }[] = [];
  pieChartExpensesData: { name: string; value: number; }[] = [];


  incomes: Income[] = [];
  totalIncome: number = 0;
  totalExpense: number = 0;
  totalBudget: number = 0;

  categories: Category[] = [];

  currentMonth!: string;

  gradient = false;
  colorScheme: Color = {
    name: 'Black',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#2CC2C7FF', '#932CC7FF']
  };

  constructor(private incomeService: IncomeService,
              public userService: UserService,
              private expenseService: ExpenseService,
              private categoryService: CategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();

    this.currentMonth = new Date().toLocaleString('default', {month: 'long'});

    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories) => {
        this.categories = categories;
      });

    this.userService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.getIncomesByCurrentMonth();
    this.getExpensesByCurrentMonth();

  }

  private getIncomesByCurrentMonth() {
    this.incomeService.getIncomesByUserId(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((incomes) => {
        this.totalIncome = incomes.reduce(
          (sum, income) => sum + income.amount, 0
        );
        this.calculateTotalBudget();

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        this.incomesData = Array(daysInMonth).fill(0).map((_, index) => {
          const day = index + 1;
          const filteredIncomes = incomes.filter(income => {
            const incomeDate = new Date(income.date);
            return incomeDate.getMonth() === currentMonth && incomeDate.getDate() === day;
          });
          const totalAmount = filteredIncomes.reduce((sum, income) => sum + income.amount, 0);
          return ({name: `${day}`, value: totalAmount});
        });

        const categoryAmounts: { [key: number]: number } = {};
        incomes.forEach(income => {
          const categoryId = income.categoryId;
          if (!categoryAmounts[categoryId]) {
            categoryAmounts[categoryId] = 0;
          }
          categoryAmounts[categoryId] += income.amount;
        });

        this.pieChartIncomesData = this.categories.map(category => {
          const categoryId = category.id;
          const categoryName = category.name;
          const totalAmount = categoryAmounts[categoryId] || 0;
          return {name: categoryName, value: totalAmount};
        });

      });
  }

  private getIncomesByMonth(year: number, month: number) {
    this.incomeService.getIncomesByUserId(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((incomes) => {
        // Filter incomes by the specified month
        const filteredIncomes = incomes.filter(income => {
          const incomeDate = new Date(income.date);
          return incomeDate.getFullYear() === year && incomeDate.getMonth() === month;
        });

        this.totalIncome = filteredIncomes.reduce(
          (sum, income) => sum + income.amount, 0
        );
        this.calculateTotalBudget();

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        this.incomesData = Array(daysInMonth).fill(0).map((_, index) => {
          const day = index + 1;
          const dayIncomes = filteredIncomes.filter(income => {
            const incomeDate = new Date(income.date);
            return incomeDate.getDate() === day;
          });

          const totalAmount = dayIncomes.reduce((sum, income) => sum + income.amount, 0);

          return ({name: `${day}`, value: totalAmount});
        });

        console.log(this.incomesData);

        const categoryAmounts: { [key: number]: number } = {};
        filteredIncomes.forEach(income => {
          const categoryId = income.categoryId;
          if (!categoryAmounts[categoryId]) {
            categoryAmounts[categoryId] = 0;
          }
          categoryAmounts[categoryId] += income.amount;
        });

        this.pieChartIncomesData = this.categories.map(category => {
          const categoryId = category.id;
          const categoryName = category.name;
          const totalAmount = categoryAmounts[categoryId] || 0;
          return {name: categoryName, value: totalAmount};
        });

      });
  }



  private getExpensesByCurrentMonth() {
    this.expenseService.getExpensesByUserId(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((expenses) => {
        this.totalExpense = expenses.reduce(
          (sum, expense) => sum + expense.amount, 0
        );
        this.calculateTotalBudget();

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        this.expensesData = Array(daysInMonth).fill(0).map((_, index) => {
          const day = index + 1;
          const filteredExpenses = expenses.filter(expense => {
            const expenseData = new Date(expense.date);
            return expenseData.getMonth() === currentMonth && expenseData.getDate() === day;
          });
          const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
          return ({name: `${day}`, value: totalAmount});
        });


        const categoryAmounts: { [key: number]: number } = {};
        expenses.forEach(expense => {
          const categoryId = expense.categoryId;
          if (!categoryAmounts[categoryId]) {
            categoryAmounts[categoryId] = 0;
          }
          categoryAmounts[categoryId] += expense.amount;
        });

        this.pieChartExpensesData = this.categories.map(category => {
          const categoryId = category.id;
          const categoryName = category.name;
          const totalAmount = categoryAmounts[categoryId] || 0;
          return {name: categoryName, value: totalAmount};
        });
      });
  }

  dataLabelFormatting = (value: number | null) => {
    if (value === 0 || value === null) {
      return null;
    } else {
      return value;
    }
  }

  calculateTotalBudget(): void {
    this.totalBudget = this.totalIncome - this.totalExpense;
  }
}
