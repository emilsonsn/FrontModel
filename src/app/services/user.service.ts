import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ApiResponse, ApiResponsePageable, DeleteApiResponse, PageControl } from '@model/application';
import { UserInfo } from '@model/user';
import { Utils } from '@shared/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly _http: HttpClient
  ) { }

  public getUsers(pageControl: PageControl, filters?): Observable<ApiResponsePageable<UserInfo>> {
    
    const paginate = Utils.mountPageControl(pageControl);
    const filterParams = Utils.mountPageControl(filters);

    return this._http.get<ApiResponsePageable<UserInfo>>(`${environment.api}/user/search?${paginate}${filterParams}`);
  }

  public userInfo(): Observable<ApiResponse<UserInfo>> {
    return this._http.get<ApiResponse<UserInfo>>(`${environment.api}/user/info`);
  }

  public postUser(user: UserInfo): Observable<ApiResponse<UserInfo>> {
    return this._http.post<ApiResponse<UserInfo>>(`${environment.api}/user`, user);
  }

  public patchUser(id: number, user: UserInfo): Observable<ApiResponse<UserInfo>> {
    return this._http.patch<ApiResponse<UserInfo>>(`${environment.api}/user/${id}`, user);
  }

  public deleteUser(id: number): Observable<DeleteApiResponse> {
    return this._http.delete<DeleteApiResponse>(`${environment.api}/user/${id}`);
  }
}
