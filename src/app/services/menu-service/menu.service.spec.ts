import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MenuService } from './menu.service';
import { IMenuResponse } from '../../Models/menuModels';

describe('MenuService', () => {
  let service: MenuService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MenuService]
    });

    service = TestBed.inject(MenuService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch menu', () => {
    const mockResponse: IMenuResponse = {
      data: [
        { url: '/item1', title: 'Item 1' },
        { url: '/item2', title: 'Item 2' },
        { url: '/item3', title: 'Item 3' },
      ]
    };

    service.getMenu().subscribe(menu => {
      expect(menu.length).toBe(3);
      expect(menu[0].url).toBe("/item1");
      expect(menu[0].title).toBe("Item 1");

      expect(menu[1].url).toBe("/item2");
      expect(menu[1].title).toBe("Item 2");

      expect(menu[2].url).toBe("/item3");
      expect(menu[2].title).toBe("Item 3");
    });

    const req = httpMock.expectOne('/menu.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
