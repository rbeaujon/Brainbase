import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ApiService', () => {
  let service: ApiService;
  
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
  }));

  it('Should Api Service be created', () => {
    expect(service).toBeTruthy();
  });

});
