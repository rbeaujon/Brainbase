import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('Should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should have the title "brainbase" ', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance;
    expect(app.title).toBe('brainbase');
  })

  it('Expect the correct percentage ', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance;
    expect(app.getDiff(50, 100)).toEqual(50);
  })

  it('Should the currency button be disabled ', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance;
    const element: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('#currency');
    app.avoid429()
   
    expect(element.disabled).toEqual(true);
  })

});