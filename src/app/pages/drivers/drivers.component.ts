import { Component, OnDestroy, OnInit } from '@angular/core';
import { DriversService } from '../../services/drivers-service/drivers.service';
import { Subscription } from 'rxjs';
import { DayOfWeek, ITableActivity, ITableDriver } from '../../Models/driverModels';
import { FormsModule } from '@angular/forms';
import { getDaysInWeek, sortByString } from '../../services/drivers-service/driver-helper';

@Component({
  selector: 'app-drivers',
  imports: [FormsModule],
  providers: [DriversService],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css',
  standalone: true
})
export class DriversComponent implements OnInit, OnDestroy {
  public daysInWeek = getDaysInWeek();
  public dayOfWeek = DayOfWeek;
  public filteredDrivers: ITableDriver[] = [];
  private _drivers: ITableDriver[] = [];
  private _subscription = new Subscription();

  constructor(private readonly _driversService: DriversService) { }

  ngOnInit(): void {
    this._subscription.add(this._driversService.getDrivers()
      .subscribe((drivers) => {
        this._drivers = drivers;
        this.filteredDrivers = drivers;
      })
    );
  }

  public onSearchKeyUp(event: Event): void {
    const searchText = event.target as HTMLInputElement;

    // check if name or vehicle registration contains the search text
    this.filteredDrivers = this._drivers.filter(driver => {
      const drivers = driver.name.toLowerCase().includes(searchText.value.toLowerCase());
      const vehicles = driver.vehicleRegistration.toLowerCase().includes(searchText.value.toLowerCase());
      return drivers || vehicles;
    });
  }

  public driverActive(driver: ITableDriver, day: DayOfWeek): boolean {
    return driver.activityDays.some(dayOfWeek => dayOfWeek === day);
  }

  public getActivites(activiteis: ITableActivity[]) {
    if (activiteis.length === 0) {
      return "";
    }
    // concat the activity type and the total activity duration
    const sortedActivities = sortByString(activiteis, "type");
    const activityDetails = sortedActivities.map((activity) => (activity.type + ": " + activity.totalActivityDuration)).join(", ");
    return `(${activityDetails})`;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
