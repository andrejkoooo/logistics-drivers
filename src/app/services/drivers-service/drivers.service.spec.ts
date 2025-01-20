import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DriversService } from './drivers.service';
import { IDriversReposnse } from '../../Models/driverModels';

describe('DriversService', () => {
  let service: DriversService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DriversService,
        provideHttpClientTesting(),
        ]
    });
    service = TestBed.inject(DriversService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch drivers and map to table drivers', () => {
    const mockResponse: IDriversReposnse = {
      data: [
        {
          driverID: 1,
          forename: 'John',
          surname: 'Doe',
          vehicleRegistration: 'ABC123',
          traces: []
        }
      ]
    };

    service.getDrivers().subscribe(drivers => {
      expect(drivers.length).toBe(1);
      expect(drivers[0].driverID).toBe(1);
      expect(drivers[0].name).toBe('John Doe');
      expect(drivers[0].vehicleRegistration).toBe('ABC123');
      expect(drivers[0].totalDuration).toBe(0);
      expect(drivers[0].activityDays).toEqual([]);
      expect(drivers[0].activityTypes).toEqual([]);
    });

    const req = httpMock.expectOne('/drivers.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
