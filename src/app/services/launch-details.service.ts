import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaunchDetailsService {
  url = 'https://api.spaceXdata.com/v3/launches?limit=100';
  constructor(private http:HttpClient) {
   }
   getLaunchDetails() {
     return this.http.get(this.url);
   } 

   getSuccessfulLaunch(launch) {
    return this.http.get(this.url + "&launch_success=" + launch);
   }

   getSuccessfulLand(land) {
    return this.http.get(this.url + "&land_success=" + land);
   }

   getSuccessfulLaunchLand(launch,land) {
    return this.http.get(this.url + "&launch_success=" + launch +"&land_success="+ land);
   }

   getSuccessfulLaunchLandYear(launch,land,year) {
    return this.http.get(this.url + "&launch_success=" + launch + "&land_success=" + land + "&launch_year=" + year);
   }

   getYearData(year) {
    return this.http.get(this.url + "&launch_year=" + year);
   }

   getSuccessfulLandYear(land,year) {
    return this.http.get(this.url + "&launch_year=" + year +"&land_success="+ land);
   }

   getSuccessfulLaunchYear(launch,year) {
    return this.http.get(this.url + "&launch_year=" + year + "&launch_success=" + launch);
   }
}
