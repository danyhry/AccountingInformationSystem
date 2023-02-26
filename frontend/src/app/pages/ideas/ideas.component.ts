import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Base} from "../../services/destroy.service";
import {User} from "../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {MatTableDataSource} from "@angular/material/table";
import {InvestmentModel} from "../../models/investment-model";

@Component({
  selector: "app-ideas",
  templateUrl: "ideas.component.html",
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent extends Base implements OnInit {

  users!: User[];

  value = '';

  displayedColumns: string[] = ['year', 'incomesInMonth', 'expenses', 'monthlyNetIncome', 'totalIncomeForThisYear', 'totalIncomeForLastYear', 'percentForLastYearIncome', 'percentForThisYearIncome', 'totalCapital'];
  dataSource = new MatTableDataSource<InvestmentModel>();
  investmentData: any[] = [];

  investmentsForm: FormGroup = this.fb.group({
    startingCapital: [2300, [Validators.required]],
    incomes: [800, [Validators.required]],
    expenses: [300, [Validators.required]],
    expectedIncomeGrowthRate: [10, [Validators.required]],
    investmentRate: [12, [Validators.required]],
    inflationRate: [20, [Validators.required]],
    age: [20, [Validators.required]],
  });

  chartData!: any[];

  colorScheme: Color = {
    name: 'Black',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#2CC2C7FF', '#932CC7FF']
  };
  age: number = 0;
  monthlyNetIncome: number = 0;
  incomesInMonth: number = 0;
  totalCapital: number = 0;
  investmentsMap = new Map<number, number>();
  percentForLastYearIncome: number = 0
  isCreateInvestmentModel!: boolean;

  constructor(private userService: UserService,
              private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  createInvestmentModel() {
    console.log('createInvestmentModel');
    this.isCreateInvestmentModel = true;
    // Retrieve input values from the form
    let {
      age,
      investmentRate,
      expectedIncomeGrowthRate,
      inflationRate,
      incomes,
      expenses,
      startingCapital
    } = this.investmentsForm.value;

    this.age = age;
    // Convert percentage values to decimal
    const investmentRateDecimal = investmentRate * 0.01;
    const expectedIncomeGrowthRateDecimal = expectedIncomeGrowthRate * 0.01;
    const inflationRateDecimal = inflationRate * 0.01;

    // Initialize variables
    let year = 1;
    let totalCapital = 0;
    let incomesInMonth = incomes;
    let startingCapitalYear = startingCapital;

    // Loop for 10 years
    while (year <= 10) {
      let yearData = {};
      if (year > 1) {
        // Update variables for subsequent years
        startingCapitalYear = 0;
        incomesInMonth += incomesInMonth * expectedIncomeGrowthRateDecimal;
        let percentForLastYearIncome = investmentRateDecimal * totalCapital;

        expenses = expenses * (1 + inflationRateDecimal);

        // Calculate income and percentage for the current year
        let monthlyNetIncome = incomesInMonth - expenses;
        let totalIncomeForThisYear = monthlyNetIncome * 12;
        let totalIncomeForLastYear = totalCapital;
        let percentForThisYearIncome = investmentRateDecimal * totalIncomeForThisYear / 2;


        // Update total capital for the year
        totalCapital += totalIncomeForThisYear + percentForLastYearIncome + percentForThisYearIncome;

        incomesInMonth = Math.round(incomesInMonth);
        expenses = Math.round(expenses);
        monthlyNetIncome = Math.round(monthlyNetIncome);
        totalIncomeForThisYear = Math.round(totalIncomeForThisYear);
        totalIncomeForLastYear = Math.round(totalIncomeForLastYear);
        percentForLastYearIncome = Math.round(percentForLastYearIncome);
        percentForThisYearIncome = Math.round(percentForThisYearIncome);
        totalCapital = Math.round(totalCapital);

        yearData = {
          year,
          incomesInMonth,
          expenses,
          monthlyNetIncome,
          totalIncomeForThisYear,
          totalIncomeForLastYear,
          percentForLastYearIncome,
          percentForThisYearIncome,
          totalCapital
        };
      } else {
        // Calculate income and percentage for the first year
        const percentForLastYearIncome = investmentRateDecimal * startingCapitalYear;
        const monthlyNetIncome = incomesInMonth - expenses;
        const totalIncomeForThisYear = monthlyNetIncome * 12;
        const percentForThisYearIncome = investmentRateDecimal * totalIncomeForThisYear / 2;

        // Update total capital for the year
        totalCapital += startingCapitalYear + totalIncomeForThisYear + percentForLastYearIncome + percentForThisYearIncome;
        totalCapital = Math.round(totalCapital);

        yearData = {
          year,
          incomesInMonth,
          expenses,
          monthlyNetIncome,
          totalIncomeForThisYear,
          percentForLastYearIncome,
          percentForThisYearIncome,
          totalCapital
        };
      }
      // Store the result in a Map
      this.investmentsMap.set(age + year, totalCapital);


      this.investmentData.push(yearData);
      this.dataSource = new MatTableDataSource(this.investmentData);

      // Move to the next year
      year++;
    }

    // Convert Map to array of objects
    const data = Array.from(this.investmentsMap).map(([year, capital]) => {
      return {
        name: year,
        value: capital,
      };
    });
    this.chartData = [{name: 'Capital', series: data}];


    // Refresh the form and variables
    this.refreshInvestmentsModel();
  }

  refreshInvestmentsModel() {
    this.investmentsMap.clear();
    this.investmentData = [];
    this.incomesInMonth = 0;
    this.totalCapital = 0;
  }
}
