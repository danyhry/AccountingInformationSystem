import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utility} from "../models/utility.model";

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  private apiUrl = 'utilities';

  constructor(private http: HttpClient) {
  }

  saveUtility(utility: Utility): Observable<Utility> {
    return this.http.post<Utility>(this.apiUrl, utility);
  }

  getUtilities(): Observable<Utility[]> {
    return this.http.get<Utility[]>(this.apiUrl);
  }

  getUtilityByUserId(userId: number): Observable<Utility> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<Utility>(url);
  }

  updateUtility(utility: Utility): Observable<Utility> {
    const url = `${this.apiUrl}/${utility.id}`;
    return this.http.put<Utility>(url, utility);
  }

  deleteUtility(id: number): Observable<Utility> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Utility>(url);
  }

}
