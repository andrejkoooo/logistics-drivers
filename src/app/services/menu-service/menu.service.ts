import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMenu, IMenuResponse } from '../../Models/menuModels';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly menuData = '/menu.json';
  constructor(private readonly _http: HttpClient) { }

  public getMenu() {
   return this._http.get<IMenuResponse>(this.menuData)
    .pipe(map(x => x.data))
  }
}
