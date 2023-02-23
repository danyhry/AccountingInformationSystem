import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Income} from "../models/income";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private incomeUrl = 'incomes';

  constructor(private http: HttpClient) {
  }

  getIncomes(): Observable<Income[]> {
    return this.http.get<Income[]>(this.incomeUrl);
  }

  getIncomesByUserId(userId: number): Observable<Income[]> {
    const url = `${this.incomeUrl}/${userId}`;
    return this.http.get<Income[]>(url);
  }

  addIncome(income: Income): Observable<Income> {
    return this.http.post<Income>(this.incomeUrl, income);
  }

  updateIncome(income: Income, id: number): Observable<void> {
    const url = `${this.incomeUrl}/${id}`;
    return this.http.put<void>(url, income);
  }

  deleteIncome(id: number): Observable<void> {
    const url = `${this.incomeUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
