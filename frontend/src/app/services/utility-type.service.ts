import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UtilityType} from "../models/utility-type.model";

@Injectable({
  providedIn: 'root'
})
export class UtilityTypeService {

  private utilityTypesUrl = 'utilities/utilityTypes';

  constructor(private http: HttpClient) {
  }

  getUtilityTypes(): Observable<UtilityType[]> {
    return this.http.get<UtilityType[]>(this.utilityTypesUrl);
  }

  deleteUtilityType(id: number): Observable<UtilityType> {
    const url = `${this.utilityTypesUrl}/${id}`;
    return this.http.delete<UtilityType>(url);
  }

  createUtilityType(data: any): Observable<UtilityType> {
    return this.http.post<UtilityType>(this.utilityTypesUrl, data);
  }

  updateUtilityType(id: number, item: Partial<UtilityType>): Observable<UtilityType> {
    return this.http.put<UtilityType>(this.utilityTypesUrl + '/' + id, item);
  }
}
