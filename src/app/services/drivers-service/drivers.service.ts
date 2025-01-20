import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDriver, IDriversReposnse, ITableDriver } from '../../Models/driverModels';
import { map } from 'rxjs';
import { calculateTotalActivityTime, getActivityDays, getGroupActivities } from './driver-helper';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  private readonly _drivers = '/drivers.json';
  constructor(private readonly _http: HttpClient) { }

  public getDrivers() {
    return this._http.get<IDriversReposnse>(this._drivers)
      .pipe(map(x => (x.data.map(this.mapToTableDriver))))
  }

  private mapToTableDriver(driver: IDriver): ITableDriver {
    return {
      driverID: driver.driverID,
      name: driver.forename + ' ' + driver.surname,
      vehicleRegistration: driver.vehicleRegistration,
      totalDuration: driver.traces?  calculateTotalActivityTime(driver.traces): 0,
      activityDays: getActivityDays(driver.traces),
      activityTypes: getGroupActivities(driver.traces)
    } as ITableDriver;
  }

}
