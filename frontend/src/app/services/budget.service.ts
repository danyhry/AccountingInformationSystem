import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgetUrl = 'budget';

  constructor(private http: HttpClient) {
  }

}
