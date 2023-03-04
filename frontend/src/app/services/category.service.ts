import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl = 'categories';

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  getCategoryById(categoryId: number): Observable<Category> {
    const url = `${this.categoriesUrl}/${categoryId}`;
    return this.http.get<Category>(url);
  }
}
