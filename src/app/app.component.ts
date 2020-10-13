import { Component } from '@angular/core';
import { LaunchDetailsService } from './services/launch-details.service';
import {Location} from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'launch-tracker';
  launchYears = [];
  launch_details = [];
  allLaunchDetails = [];
  yearSelected: boolean = false;
  successLaunch: boolean;
  successLand: boolean;
  yearSelectValue;

  constructor(private launchDetailsService: LaunchDetailsService,private location: Location,private router: Router) { }
  ngOnInit() {
    this.getAllData();
    this.successLaunch = undefined;
    this.successLand = undefined;
    this.location.replaceState("/allLaunches");
  }
  getLaunchDetail() {
    return this.launchDetailsService.getLaunchDetails().toPromise();
  }

  async getAllData() {
    let obj;
    const launchDetails = await this.getLaunchDetail();
    // console.log(launchDetails);

    for (let i in launchDetails) {
      this.allLaunchDetails.push(launchDetails[i]);
      // Year filter
      if (this.launchYears.indexOf(launchDetails[i].launch_year) === -1) {
        this.launchYears.push(launchDetails[i].launch_year);
      }
      // Launch details for populate on UI
      obj = {
        "launch-title": launchDetails[i].mission_name, "launch-num": launchDetails[i].flight_number,
        "launch-year": launchDetails[i].launch_year, "launch-Success": launchDetails[i].launch_success,
        "launch_landing": launchDetails[i].launch_landing,"mission-id":launchDetails[i].mission_id,
        "image-link":launchDetails[i].links.mission_patch_small
      }
      this.launch_details.push(obj);
    }
    // console.log(this.launchYears);
    console.log(this.launch_details);
  }

  loadLaunchYear(year) {
    this.yearSelected = true;
    this.yearSelectValue = year;
    this.calulateFilteredDetails(year,this.successLaunch,this.successLand)
  }
  toggleLaunch(val) {
    if(val == 'Y') {
      this.successLaunch = true;
    } 
    if(val == 'N') {
      this.successLaunch = false;
    }
    this.calulateFilteredDetails(this.yearSelectValue,this.successLaunch,this.successLand)
  }
  toggleLand(val) {
    if(val == 'Y') {
      this.successLand = true;
    } 
    if(val == 'N') {
      this.successLand = false;
    }
    // this.calulateFilteredDetails(this.yearSelectValue,this.successLaunch,this.successLand)
    this.toggleLaunch(this.successLand?'Y':'N');
  }

  calulateFilteredDetailsService(year,launch,land) {
    if(launch !=undefined) {
      this.location.replaceState("/filterLaunchSuccess");
      return this.launchDetailsService.getSuccessfulLaunch(launch).toPromise();
    }
    if(land!=undefined) {
      this.location.replaceState("/filterLandSuccess");
      return this.launchDetailsService.getSuccessfulLand(land).toPromise();
    }
    if(this.yearSelected == true ) {
      this.location.replaceState("/filterLaunchYear");
      return this.launchDetailsService.getYearData(year).toPromise();
    }
    if(land!=undefined && launch!=undefined ) {
      this.location.replaceState("/filterLaunchYear&land");
      return this.launchDetailsService.getSuccessfulLaunchLand(launch,land).toPromise();
    }
    if(land!=undefined && launch!=undefined && this.yearSelected) {
      this.location.replaceState("/filterLaunchYear&land&launch");
      return this.launchDetailsService.getSuccessfulLaunchLandYear(launch,land,year).toPromise();
    }
  }

  async calulateFilteredDetails(year,launch,land) {
    const filterDetails = await this.calulateFilteredDetailsService(this.yearSelectValue,this.successLaunch,this.successLand);
    let obj;
    this.launch_details = [];
    for (let i in filterDetails) {
      // Launch details for populate on UI
      obj = {
        "launch-title": filterDetails[i].mission_name, "launch-num": filterDetails[i].flight_number,
        "launch-year": filterDetails[i].launch_year, "launch-Success": filterDetails[i].launch_success,
        "launch_landing": filterDetails[i].launch_landing,"mission-id":filterDetails[i].mission_id,
        "image-link":filterDetails[i].links.mission_patch_small
      }
      this.launch_details.push(obj);
    }

  }


}
