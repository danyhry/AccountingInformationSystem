import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses = [
    { description: 'Rent', amount: 1500 },
    { description: 'Food', amount: 500 },
    { description: 'Transportation', amount: 100 }
  ];

  constructor() { }

  getExpenses() {
    return this.expenses;
  }

  getTotalExpense() {
    return this.expenses.reduce((acc, expense) => acc + expense.amount, 0);
  }

  addExpense(expense: { description: string, amount: number }) {
    this.expenses.push(expense);
  }
}
