import {Expense} from "./expense";
import {Income} from "./income";

export interface Budget {
  id: number;
  userId: number;
  expenses: Expense[];
  incomes: Income[];
  totalExpense: number;
  totalIncome: number;
  dateExpenses: Date[],
  dateIncomes: Date[]
}
