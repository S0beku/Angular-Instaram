import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  addPic(opis: string, base64: string, token: string | null): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/upload.php', {
      opiss: opis,
      photo: base64,
      token: token,
    });
  }

  getPic(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/PhotoHandler.php');
  }

  delPic(id: number): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/DeletePhotoHandler.php', {
      id: id,
    });
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    return token != null && token.length > 0;
  }

  addUser(login: string, password: string, age: number): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + '/regin.php', {
        login: login,
        password: password,
        age: age,
      })
      .pipe(
        tap({
          next: (response) => {
            if (response.token) {
              localStorage.setItem('token', response.token);
            }
          },
        })
      );
  }
  checkUser(login: string, password: string): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + '/login.php', {
        login: login,
        password: password,
      })
      .pipe(
        tap({
          next: (response) => {
            if (response.token) {
              localStorage.setItem('token', response.token);
            }
          },
        })
      );
  }
}
