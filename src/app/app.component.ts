import { Component } from '@angular/core';
import { LaunchDetailsService } from './services/launch-details.service';
import { Location } from '@angular/common';
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
  errorMsg = "";
  error: boolean = false;

  constructor(private launchDetailsService: LaunchDetailsService, private location: Location, private router: Router) { }
  ngOnInit() {
    this.getAllData();
    this.successLaunch = undefined;
    this.successLand = undefined;
    this.yearSelectValue = undefined;
    this.location.replaceState('/allLaunches');
  }
  getLaunchDetail() {
    return this.launchDetailsService.getLaunchDetails().toPromise();
  }

  async getAllData() {
    let obj;
    let landingSuccess;
    const launchDetails = await this.getLaunchDetail();
    // console.log(launchDetails);
    if (launchDetails && [launchDetails].length) {
      for (const i in launchDetails) {
        this.allLaunchDetails.push(launchDetails[i]);
        // Year filter
        if (this.launchYears.indexOf(launchDetails[i].launch_year) === -1) {
          this.launchYears.push(launchDetails[i].launch_year);
        }
        //landing-success
        let land_success_check = launchDetails[i].rocket.first_stage;
        if (land_success_check && land_success_check.cores[0].land_success != null) {
          // console.log("inside");
          // console.log(launchDetails[i].rocket.first_stage);
          landingSuccess = launchDetails[i].rocket.first_stage.cores[0].land_success;
        } else {
          landingSuccess = "Data not available";
        }
        // Launch details for populate on UI
        obj = {
          "launch-title": launchDetails[i].mission_name, "launch-num": launchDetails[i].flight_number,
          "launch-year": launchDetails[i].launch_year, "launch-Success": launchDetails[i].launch_success, "mission-id": launchDetails[i].mission_id,
          "image-link": launchDetails[i].links.mission_patch_small, "land-success": landingSuccess
        }
        this.launch_details.push(obj);
      }
    } else {
      this.error = true;
      this.errorMsg = "Something Went wrong. Please try again."
    }
    // console.log(this.launchYears);
    // console.log(this.launch_details);
  }

  loadLaunchYear(year) {
    this.yearSelected = true;
    this.yearSelectValue = year;
    this.successLaunch = undefined;
    this.successLand = undefined;
    this.calulateFilteredDetails(this.yearSelectValue, this.successLaunch, this.successLand)
  }
  toggleLaunch(val) {
    if (val === 'Y') {
      this.successLaunch = true;
    }
    if (val === 'N') {
      this.successLaunch = false;
    }
    this.calulateFilteredDetails(this.yearSelectValue, this.successLaunch, this.successLand)
  }
  toggleLand(val) {
    if (val === 'Y') {
      this.successLand = true;
    }
    if (val === 'N') {
      this.successLand = false;
    }
    this.calulateFilteredDetails(this.yearSelectValue, this.successLaunch, this.successLand)
  }

  calulateFilteredDetailsService(year, launch, land) {
    // Land, Launch & Year Success
    if (land !== undefined && launch !== undefined && this.yearSelected) {
      this.location.replaceState("/filterLaunchYear&land&launch");
      return this.launchDetailsService.getSuccessfulLaunchLandYear(launch, land, year).toPromise();
    }
    // Land & Launch Success
    if (land !== undefined && launch !== undefined && !this.yearSelected) {
      this.location.replaceState("/filterLaunch&land");
      return this.launchDetailsService.getSuccessfulLaunchLand(launch, land).toPromise();
    }
    // Land & Year Success
    if (land !== undefined && this.yearSelected) {
      this.location.replaceState("/filterLaunch&land");
      return this.launchDetailsService.getSuccessfulLandYear(land, year).toPromise();
    }
    // Launch & Year Success
    if (launch !== undefined && this.yearSelected) {
      this.location.replaceState("/filterLaunch&land");
      return this.launchDetailsService.getSuccessfulLaunchYear(launch, year).toPromise();
    }
    // Only Launch Success
    if (launch !== undefined && !this.yearSelected && land === undefined) {
      this.location.replaceState("/filterLaunchSuccess");
      return this.launchDetailsService.getSuccessfulLaunch(launch).toPromise();
    }
    // Only Land Success
    if (land !== undefined && !this.yearSelected && launch === undefined) {
      this.location.replaceState("/filterLandSuccess");
      return this.launchDetailsService.getSuccessfulLand(land).toPromise();
    }
    // Only Year Selected
    if (this.yearSelected === true && launch === undefined && land === undefined) {
      this.location.replaceState("/filterLaunchYear");
      return this.launchDetailsService.getYearData(year).toPromise();
    }
  }

  async calulateFilteredDetails(year, launch, land) {
    const filterDetails = await this.calulateFilteredDetailsService(year, launch, land);
    let obj;
    let landingSuccess;
    this.launch_details = [];
    if (filterDetails) {
      this.error = false;
      this.errorMsg = "";
      for (const i in filterDetails) {
        //landing-success
        let land_success_check = filterDetails[i].rocket.first_stage;
        if (land_success_check && land_success_check.cores[0].land_success != null) {
          landingSuccess = filterDetails[i].rocket.first_stage.cores[0].land_success;
        } 
        // else {
        //   landingSuccess = "Data not available";
        // }
        obj = {
          "launch-title": filterDetails[i].mission_name, "launch-num": filterDetails[i].flight_number,
          "launch-year": filterDetails[i].launch_year, "launch-Success": filterDetails[i].launch_success,
          "land-success": landingSuccess, "mission-id": filterDetails[i].mission_id,
          "image-link": filterDetails[i].links.mission_patch_small
        }
        this.launch_details.push(obj);
      }
    }
    if (this.launch_details && this.launch_details.length > 0) {
      this.error = false;
      this.errorMsg = "";
    } else {
      this.error = true;
      this.errorMsg = "No Data Available for following Selection."
    }
    // console.log(this.launch_details);
  }

  clearFilter() {
    this.successLaunch = undefined;
    this.successLand = undefined;
    this.yearSelectValue = undefined;
    this.yearSelected = false;
    this.error = false;
    this.errorMsg = "";
    this.getAllData();
    this.location.replaceState('/allLaunches');
  }


}
