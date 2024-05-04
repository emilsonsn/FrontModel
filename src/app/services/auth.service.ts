import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@env/environment';
import { Auth } from '@model/auth';
import { InterceptorSkipHeader } from './auth-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly _http: HttpClient
  ) { }

  login(auth: Auth): Observable<any> {
    return this._http.post<any>(`${environment.api}/login`, auth, {
      headers: new HttpHeaders().set(InterceptorSkipHeader, '')
    });
  }

  logout(): Observable<any> {
    return this._http.get<any>(`${environment.api}/logout`);
  }

  isAuthenticated(): Observable<any> {
    return this._http.get<any>(`${environment.api}/validateToken`)
      .pipe(map(res => res.success));
  }
}
