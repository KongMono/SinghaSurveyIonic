import { Injectable, NgZone, Inject } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { ConfigApp, IAppConfig } from './../app/app.config';

@Injectable()
export class LocationTracker {
  
  public watch: any;    
  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone, public backgroundGeolocation: BackgroundGeolocation, public geolocation: Geolocation, @Inject(ConfigApp) private configApp: IAppConfig) {

  }

  startTracking() {

  	// // Background Tracking

    // let config = {
    //   desiredAccuracy: 0,
    //   stationaryRadius: 0, // 20
    //   distanceFilter: 0, // 10
    //   debug: false,
    //   interval: 2000,
    //   stopOnTerminate: false
    // };

    // this.backgroundGeolocation.configure(config).subscribe((location) => {

    //   console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

    //   // Run update inside of Angular's zone
    //   this.zone.run(() => {
    //     this.lat = location.latitude;
    //     this.lng = location.longitude;
    //     this.configApp.latitude = this.lat;
    //     this.configApp.longitude = this.lng;
    //   });

    // }, (err) => {

    //   console.log(err);

    // });

    // // Turn ON the background-geolocation system.
    // this.backgroundGeolocation.start();


    // Foreground Tracking

	let options = {
		frequency: 3000,
		enableHighAccuracy: true
	};

	this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

		console.log(position);

		// Run update inside of Angular's zone
		this.zone.run(() => {
			this.lat = position.coords.latitude;
			this.lng = position.coords.longitude;
      this.configApp.latitude = this.lat;
      this.configApp.longitude = this.lng;
		});

	});

  }

  stopTracking() {

    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();

  }

}