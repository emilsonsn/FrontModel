import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DDI } from '@model/application';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private _baseHref = null;

	constructor(private http: HttpClient, @Inject(APP_BASE_HREF) baseHref: string) {
    if(baseHref.endsWith('/')) {
      this._baseHref = baseHref.slice(0, -1);
    } else {
      this._baseHref = baseHref;
    }
  }

	getDdi(): Observable<DDI[]> {
		return this.http.get(`.${this._baseHref}/assets/json/ddi.json`).pipe(
			take(1),
			map((response: DDI[]) => response)
		);
	}
}
