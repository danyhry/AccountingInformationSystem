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
import {Expense} from "../../models/expense";

@Component({
  selector: "app-dashboard",
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: "dashboard.component.html"
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

  currentMonth!: string;

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


  constructor(private incomeService: IncomeService,
              public userService: UserService,
              private expenseService: ExpenseService,
              private categoryService: CategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserFromStorage().id;
    this.isAuthenticated = this.userService.isAuthenticated();

    this.currentMonth = new Date().toLocaleString('default', {month: 'long'});

    this.fetchCategories();
    // this.fetchUser();

    this.getIncomesByCurrentMonth();
    this.getExpensesByCurrentMonth();

  }

  private fetchUser() {
    this.userService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private fetchCategories() {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  private getIncomesByCurrentMonth(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    this.incomeService.getIncomesByUserId(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((incomes: Income[]) => {
        this.incomes = incomes;

        const currentMonthIncomes = this.filterByCurrentMonth(incomes, currentMonth, currentYear);
        const currentYearIncomes = this.filterByCurrentYear(incomes, currentYear);

        this.totalIncomeCurrentMonth = this.calculateTotal(currentMonthIncomes);
        this.totalIncomeCurrentYear = this.calculateTotal(currentYearIncomes);
        console.log(this.totalIncomeCurrentYear);
        this.totalIncome = this.calculateTotal(incomes);
        this.calculateBudget();

        this.incomesData = this.calculateDataByDay(currentMonthIncomes, currentMonth, currentYear);
        this.pieChartIncomesData = this.calculateCategoryAmounts(currentMonthIncomes);
      });
  }

  private getExpensesByCurrentMonth(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    this.expenseService.getExpensesByUserId(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((expenses) => {
        this.expenses = expenses;

        const currentMonthExpenses = this.filterByCurrentMonth(expenses, currentMonth, currentYear);
        const currentYearExpenses = this.filterByCurrentYear(expenses, currentYear);

        this.totalExpenseCurrentMonth = this.calculateTotal(currentMonthExpenses);
        this.totalExpenseCurrentYear = this.calculateTotal(currentYearExpenses);


        this.totalExpense = this.calculateTotal(expenses);
        this.calculateBudget();

        this.expensesData = this.calculateDataByDay(currentMonthExpenses, currentMonth, currentYear);

        this.pieChartExpensesData = this.calculateCategoryAmounts(currentMonthExpenses);
      });
  }

  calculateBudget(): void {
    this.totalBudget = this.totalIncome - this.totalExpense;
    this.currentMonthBudget = this.totalIncomeCurrentMonth - this.totalExpenseCurrentMonth;
    this.currentYearBudget = this.totalIncomeCurrentYear - this.totalExpenseCurrentYear;
  }

  private filterByCurrentMonth(data: Income[] | Expense[], currentMonth: any, currentYear: any) {
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    });
  }

  private filterByCurrentYear(data: Income[] | Expense[], currentYear: number) {
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getFullYear() === currentYear;
    });
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

  // private getIncomesByCurrentMonth1() {
  //
  //   const currentDate = new Date();
  //   const currentMonth = currentDate.getMonth();
  //   const currentYear = currentDate.getFullYear();
  //
  //   this.incomeService.getIncomesByUserId(this.userId)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((incomes) => {
  //
  //       const currentMonthIncomes = incomes.filter(income => {
  //         const incomeDate = new Date(income.date);
  //         return incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear;
  //       });
  //
  //       this.totalIncome = incomes.reduce(
  //         (sum, income) => sum + income.amount, 0
  //       );
  //       this.totalIncomeCurrentMonth = currentMonthIncomes.reduce(
  //         (sum, income) => sum + income.amount, 0
  //       );
  //       this.calculateTotalBudget();
  //
  //       const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  //       this.incomesData = Array(daysInMonth).fill(0).map((_, index) => {
  //         const day = index + 1;
  //         const filteredIncomes = currentMonthIncomes.filter(income => {
  //           const incomeDate = new Date(income.date);
  //           return incomeDate.getDate() === day;
  //         });
  //         const totalAmount = filteredIncomes.reduce((sum, income) => sum + income.amount, 0);
  //         return ({name: `${day}`, value: totalAmount});
  //       });
  //
  //       const categoryAmounts: { [key: number]: number } = {};
  //       currentMonthIncomes.forEach(income => {
  //         const categoryId = income.categoryId;
  //         if (!categoryAmounts[categoryId]) {
  //           categoryAmounts[categoryId] = 0;
  //         }
  //         categoryAmounts[categoryId] += income.amount;
  //       });
  //
  //       this.pieChartIncomesData = this.categories.map(category => {
  //         const categoryId = category.id;
  //         const categoryName = category.name;
  //         const totalAmount = categoryAmounts[categoryId] || 0;
  //         return {name: categoryName, value: totalAmount};
  //       });
  //
  //     });
  // }
  //
  // private getExpensesByCurrentMonth1() {
  //
  //   const currentDate = new Date();
  //   const currentMonth = currentDate.getMonth();
  //   const currentYear = currentDate.getFullYear();
  //
  //   this.expenseService.getExpensesByUserId(this.userId)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((expenses) => {
  //
  //       const currentMonthExpenses = expenses.filter(expense => {
  //         const expenseDate = new Date(expense.date);
  //         return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  //       });
  //
  //       this.totalExpense = expenses.reduce(
  //         (sum, expense) => sum + expense.amount, 0
  //       );
  //       this.totalExpenseCurrentMonth = currentMonthExpenses.reduce(
  //         (sum, expense) => sum + expense.amount, 0
  //       );
  //       this.calculateTotalBudget();
  //
  //
  //       const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  //
  //       this.expensesData = Array(daysInMonth).fill(0).map((_, index) => {
  //         const day = index + 1;
  //         const filteredExpenses = expenses.filter(expense => {
  //           const expenseData = new Date(expense.date);
  //           return expenseData.getMonth() === currentMonth && expenseData.getDate() === day;
  //         });
  //         const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  //         return ({name: `${day}`, value: totalAmount});
  //       });
  //
  //
  //       const categoryAmounts: { [key: number]: number } = {};
  //       expenses.forEach(expense => {
  //         const categoryId = expense.categoryId;
  //         if (!categoryAmounts[categoryId]) {
  //           categoryAmounts[categoryId] = 0;
  //         }
  //         categoryAmounts[categoryId] += expense.amount;
  //       });
  //
  //       this.pieChartExpensesData = this.categories.map(category => {
  //         const categoryId = category.id;
  //         const categoryName = category.name;
  //         const totalAmount = categoryAmounts[categoryId] || 0;
  //         return {name: categoryName, value: totalAmount};
  //       });
  //     });
  // }
}
