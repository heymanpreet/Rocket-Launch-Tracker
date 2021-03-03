import { TestBed } from '@angular/core/testing';
import { LaunchDetailsService } from './launch-details.service';
import { AppComponent } from '../app.component';
import { HttpClientModule } from '@angular/common/http';

describe('LaunchDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [HttpClientModule],
    providers:[LaunchDetailsService]
  }));

  it('should be created', () => {
    const service: LaunchDetailsService = TestBed.get(LaunchDetailsService);
    expect(service).toBeTruthy();
  });

  it('get all Launch Data', async () => {

    const service: LaunchDetailsService = TestBed.get(LaunchDetailsService);
    const selected = await service.getLaunchDetails();
    expect([selected].length).toBe(1);
  });

});
