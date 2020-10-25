import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LaunchDetailsService } from './services/launch-details.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[HttpClientModule,RouterModule.forRoot([]),RouterTestingModule],
      providers:[LaunchDetailsService,{provide: APP_BASE_HREF, useValue: ''}]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'launch-tracker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('launch-tracker');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('SpaceX Launch Programs');
  });

  it('get all spaceLaunch Data', async() => {
    //exexute Test Case
    await appComponent.getAllData();
    // assertion
    // if(appComponent) {
      expect(appComponent.launch_details.length).toBe(100);
    // } 
  });

  it('Successfull Landing true', () => {
    //exexute Test Case
      appComponent.toggleLand('Y');
    // assertion
      expect(appComponent.successLand).toBe(true);
  });

  it('Successfull Launch true', () => {
    //exexute Test Case
      appComponent.toggleLaunch('Y');
    // assertion
      expect(appComponent.successLaunch).toBe(true);
  });
});
