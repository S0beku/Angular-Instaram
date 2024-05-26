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
    return this.http.get<any>(environment.apiUrl + "/upload.php");
  }
}
