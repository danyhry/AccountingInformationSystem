import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Expense} from "../models/expense";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenseUrl = 'expenses';

  constructor(private http: HttpClient) {
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.expenseUrl);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.expenseUrl, expense);
  }

  updateExpense(expense: Expense, id: number): Observable<void> {
    const url = `${this.expenseUrl}/${id}`;
    return this.http.put<void>(url, expense);
  }

  deleteExpense(id: number): Observable<void> {
    const url = `${this.expenseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
