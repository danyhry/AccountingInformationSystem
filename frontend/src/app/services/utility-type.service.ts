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

}
