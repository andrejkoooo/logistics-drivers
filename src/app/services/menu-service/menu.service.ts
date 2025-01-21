import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMenuResponse } from '../../Models/menuModels';
import {catchError, map, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly menuData = '/menu.json';
  constructor(private readonly _http: HttpClient) { }

  public getMenu() {
   return this._http.get<IMenuResponse>(this.menuData)
    .pipe(
      map(x => x.data),
      catchError( error => of(error)))
  }
}
