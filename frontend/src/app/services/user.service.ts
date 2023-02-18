import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {Message} from "../models/message";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  path = 'users';

  private user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: ''
  };

  private userChanged = new BehaviorSubject<User>(this.user);

  userChanged$ = this.userChanged.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  setUser(user: User) {
    this.user = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userChanged.next(user);
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

  updateUser(user: User) {
    this.userChanged.next(user);
  }

  clearUser() {
    // @ts-ignore
    this.userChanged.next(null); // check,  was user
  }

}
