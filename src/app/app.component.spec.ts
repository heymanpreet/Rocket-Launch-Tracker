import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LaunchDetailsService } from './services/launch-details.service';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';

const fakeShuttleInfo:any[] = [
  {
    mission_name: "mission_mars",
    flight_number: 2025,
    mission_id: [1,2],
    launch_year: "2025",
    launch_success: true,
    launch_landing: true,
    links: {
      mission_patch_small: "https://humans-of-mars.com"
    }
  }
]

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[HttpClientModule,RouterModule.forRoot([]),RouterTestingModule],
      providers:[LaunchDetailsService,{provide: APP_BASE_HREF, useValue: ''},{provide: Router, useValue: routerSpy}]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
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

  it('allLaunches route', () => {
    appComponent.calulateFilteredDetailsService(undefined,true,undefined);
    // appComponent.ngOnInit();
    expect(router.navigateByUrl).toHaveBeenCalledWith(['/allLaunches']);
  })

  // it('checking service data', fakeAsync(() => {
  //   tick();
  //   fixture.detectChanges();
  //   fixture.whenStable().then(()=>{
  //     // appComponent.getLaunchDetail().subscribe(
  //     //   shuttleInfo => expect(shuttleInfo).toBe(fakeShuttleInfo)
  //     // );
  //     const data = appComponent.launch_details;
  //     expect(data).toBe(fakeShuttleInfo)
  //   })
  // }));


  
});
