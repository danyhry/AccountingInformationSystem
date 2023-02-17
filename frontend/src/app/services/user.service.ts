import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {Message} from "../models/message";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  path = 'users';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.path);
  }

  editUser(id: number, item: Partial<User>): Observable<User> {
    console.log(item);
    return this.http.put<User>(this.path + '/' + id, item);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.path + '/' + id);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.path + '/user/me');
  }

  updatePassword(data: { newPassword: any; renewPassword: any; currentPassword: any }, id: number): Observable<Object> {
    return this.http.put(this.path + `/updatePassword/${id}`, data);
  }

  sendMessageToAdmin(contactFormValues: string): Observable<Message> {
    console.log(contactFormValues);
    return this.http.post<Message>(this.path + '/message', contactFormValues);
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('access_token') || Boolean(sessionStorage.getItem('access_token')));
  }
}
