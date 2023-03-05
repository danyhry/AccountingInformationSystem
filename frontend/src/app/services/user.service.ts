import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {Message} from "../models/message";
import {Role} from "../models/role";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'users';

  private user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: {id: 1, name: 'USER'},
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
    return this.http.get<User[]>(this.usersUrl);
  }

  editUser(id: number, item: Partial<User>): Observable<User> {
    console.log(item);
    return this.http.put<User>(this.usersUrl + '/' + id, item);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.usersUrl + '/' + id);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/user/me');
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.usersUrl + '/roles');
  }

  updatePassword(data: { newPassword: any; renewPassword: any; currentPassword: any }, id: number): Observable<Object> {
    return this.http.put(this.usersUrl + `/updatePassword/${id}`, data);
  }

  sendMessageToAdmin(contactFormValues: string): Observable<Message> {
    console.log(contactFormValues);
    return this.http.post<Message>(this.usersUrl + '/message', contactFormValues);
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('access_token') || Boolean(sessionStorage.getItem('access_token')));
  }

  updateUser(user: User) {
    this.userChanged.next(user);
  }

  clearUser() {
    // @ts-ignore
    this.userChanged.next(null);
  }

  getUserFromStorage(): User {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    return this.user;
  }

  forgotPassword(email: string){
    return this.http.post<string>(this.usersUrl + '/recover', email);
  }
}
