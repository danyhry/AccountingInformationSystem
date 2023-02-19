import {Component} from "@angular/core";
import {Income} from "../../models/income";
import {IncomeService} from "../../services/income.service";
import {Color, ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: "app-dashboard",
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent {
  incomes: Income[] = [];
  totalIncome: number = 0;
  barChartData: any[] = [];
  barChartLabels: string[] = [];
  gradient = false;
  colorScheme: Color = {
    name: 'Black',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#2CC2C7FF', '#932CC7FF']
  };

  constructor(private incomeService: IncomeService) {
  }

  ngOnInit(): void {
    this.getRecentIncomes();
    this.getTotalIncome();
  }

  getRecentIncomes(): void {
    this.incomeService
      .getIncomes()
      .subscribe((incomes) => {
        this.incomes = incomes.slice(0, 10);
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
}
