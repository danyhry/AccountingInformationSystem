import {Component} from "@angular/core";
import {Income} from "../../models/income";
import {IncomeService} from "../../services/income.service";
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {UserService} from "../../services/user.service";

@Component({
  selector: "app-dashboard",
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent {
  isAuthenticated!: boolean;

  incomes: Income[] = [];
  totalIncome: number = 0;
  groupedIncomes: any = {};
  barChartData: any[] = [];
  barChartLabels: string[] = [];
  gradient = false;
  colorScheme: Color = {
    name: 'Black',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#2CC2C7FF', '#932CC7FF']
  };

  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  constructor(private incomeService: IncomeService,
              public userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();
    console.log(this.userService.isAuthenticated());
    this.getRecentIncomes();
    this.getTotalIncome();
  }

  getRecentIncomes(): void {
    this.incomeService
      .getIncomes()
      .subscribe((incomes) => {
        this.groupIncomesByDay(incomes);
        this.incomes = incomes.slice(0, 7);
        this.barChartData = this.incomes.map(income => ({
          name: income.description,
          value: income.amount
        }));
        this.barChartLabels = this.incomes.map(income => income.description);
      });
  }

  getTotalIncome(): void {
    this.incomeService
      .getIncomes()
      .subscribe((incomes) => {
        this.totalIncome = incomes.reduce(
          (sum, income) => sum + income.amount, 0
        );
      });
  }

  getTotalIncomeByMonth(): void {

  }

  groupIncomesByMonth(incomes: Income[]): { [key: string]: number } {
    const groupedIncomes: { [month: string]: number } = {};
    for (const income of incomes) {
      const month = new Date(income.date).toLocaleString('default', {month: 'long'});
      console.log(month);
      groupedIncomes[month] = (groupedIncomes[month] || 0) + income.amount;
    }
    console.log(groupedIncomes);
    return groupedIncomes;
  }

  groupIncomesByDay(incomes: Income[]): { [key: string]: number } {
    const groupedIncomes: { [day: string]: number } = {};
    for (let income of incomes) {
      const date = new Date(income.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const key = `${year}-${month}-${day}`;
      console.log(key);
      console.log(groupedIncomes);
      if (groupedIncomes[key]) {
        groupedIncomes[key] += income.amount;
      } else {
        groupedIncomes[key] = income.amount;
      }
    }
    return groupedIncomes;
  }

}
