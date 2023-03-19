import {Injectable} from "@angular/core";
import {Address} from "../models/address.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'addresses';

  constructor(private http: HttpClient) {}

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl);
  }

  getAddressesByUserId(userId: number): Observable<Address[]> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<Address[]>(url);
  }

  getAddressById(id: number): Observable<Address> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Address>(url);
  }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, address);
  }

  updateAddress(address: Address): Observable<Address> {
    const url = `${this.apiUrl}/${address.id}`;
    return this.http.put<Address>(url, address);
  }

  deleteAddress(id: number): Observable<Address> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Address>(url);
  }
}
