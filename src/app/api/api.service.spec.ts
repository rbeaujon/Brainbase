import { TestBed, getTestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let injector: TestBed;
  let service: ApiService;
  let httpMock: HttpTestingController;
  
  beforeEach((() => {
    TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule
      ],
      declarations: [
      ],
      providers:[ApiService],
    }).compileComponents();
    service = TestBed.inject(ApiService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  }));

  it('Should Api Service be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should have an API from polygon active', () => {
    expect(service.url).toEqual('https://api.polygon.io/v1/open-close/crypto/')
  })


    it('should return an observable object from API', () => {
      const fakeResponse = 
        { open: '75', 
         close: '78' }
      
      const currency = 'USD'
      const date = '2022-02-02'
      const apikey = 'HsXGDm0Acw5MuVVMGHM6T_cArLqN8Yfo';
  
      service.getOpenCloseBTC(currency, date).subscribe(resp => {
        expect(resp.open).toEqual('75');
      });
  
      const req = httpMock.expectOne(`${service.url + "BTC/" + currency + "/"+ date + "?adjusted=true&apiKey=" + apikey}`);
      expect(req.request.method).toBe("GET");
      req.flush(fakeResponse);
    });

});
