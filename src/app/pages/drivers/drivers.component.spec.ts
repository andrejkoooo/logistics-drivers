import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversComponent } from './drivers.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DriversComponent', () => {
  let component: DriversComponent;
  let fixture: ComponentFixture<DriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversComponent],
      providers:[provideHttpClient(withInterceptorsFromDi())]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
