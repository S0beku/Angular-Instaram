import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  addPic(opis:string, base64: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + "/upload.php", {opiss: opis, photo: base64, id: 1});
  }

  getPic(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/PhotoHandler.php")
  }

  delPic(id:number): Observable<any> {
    return this.http.post<any>(environment.apiUrl + "/DeletePhotoHandler.php", {id: id})
  }
  isLoggedIn(data:string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + "/CookieHandler.php", {data: data})
  }
  addUser(login:string, password:string, age:number): Observable<any> {
    return this.http.post<any>(environment.apiUrl + "/regin.php", {login: login, password: password, age: age})
  }
  checkUser(login:string, password:string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + "/login.php", {login: login, password: password})
  }
}
