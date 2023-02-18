import {Component} from "@angular/core";
import {ChartConfiguration, ChartOptions} from "chart.js";

@Component({
  selector: "app-dashboard",
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent {
  columnChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Angular Column Chart in Material UI Tabs',
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: 'column',
        dataPoints: [
          {label: 'apple', y: 10},
          {label: 'orange', y: 15},
          {label: 'banana', y: 25},
          {label: 'mango', y: 30},
          {label: 'grape', y: 28},
        ],
      },
    ],
  };

  pieChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Angular Pie Chart in Material UI Tabs',
    },
    theme: 'light2', // "light1", "dark1", "dark2"
    data: [
      {
        type: 'pie',
        dataPoints: [
          {label: 'apple', y: 10},
          {label: 'orange', y: 15},
          {label: 'banana', y: 25},
          {label: 'mango', y: 30},
          {label: 'grape', y: 28},
        ],
      },
    ],
  };

  lineChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Angular Line Chart in Material UI Tabs',
    },
    theme: 'light2', // "light1", "dark1", "dark2"
    data: [
      {
        type: 'line',
        dataPoints: [
          {label: 1, y: 1105},
          {label: 'orange', y: 1555},
          {label: 'banana', y: 2555},
          {label: 'mango', y: 3055},
          {label: 'grape', y: 2855},
        ],
      },
    ],
  };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(2,15,255,0.3)'
      }
    ]
  };
  public lineChartOptions2: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  constructor() {
  }
}
