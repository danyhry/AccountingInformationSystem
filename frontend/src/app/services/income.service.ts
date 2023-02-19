import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Income} from "../models/income";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private incomeUrl = 'incomes';

  constructor(private http: HttpClient) { }

  getIncomes(): Observable<Income[]> {
    return this.http.get<Income[]>(this.incomeUrl);
  }

  addIncome(income: Income): Observable<Income> {
    console.log(income);
    return this.http.post<Income>(this.incomeUrl, income);
  }

  updateIncome(income: Income, id: number): Observable<void> {
    console.log(income);
    const url = `${this.incomeUrl}/${id}`;
    return this.http.put<void>(url, income);
  }

  deleteIncome(id: number): Observable<void> {
    const url = `${this.incomeUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getData(): Observable<number[]> {
    // Replace the URL with your server endpoint that returns the income data.
    return this.http.get<number[]>('https://your-server-endpoint.com/income-data');
  }

  getLabels(): Observable<string[]> {
    // Replace the URL with your server endpoint that returns the income labels.
    return this.http.get<string[]>('https://your-server-endpoint.com/income-labels');
  }
}
