import { Component, OnInit, ViewChild, ElementRef, NgZone, EventEmitter, Output, Input } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @ViewChild('search') public searchElementRef: ElementRef;
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  @Output() onAddressChange = new EventEmitter<any>();
  @Input('address') currentAddress: any;
  zoom: number;
  lat: number;
  lng: number;
  getAddress: number;
  latitude: any;
  longitude: any;
  zone: number;
  constructor(
    private apiloader: MapsAPILoader,
    private ngZone: NgZone
  ) {
  }
  async ngOnInit() {
    this.mapIntialize()
    this.zoom = 16;
  }

  /**
   * Map Intailialize
   */
  async mapIntialize() {
    await this.loadCurrentLocation();
    this.apiloader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.onAddressChange.emit(place);
        });
      });
    });
  }

  /**
   * Getting the current or Already existing Location
   * @param ()
   */

  loadCurrentLocation() {
    return new Promise((resolve) => {
      // load from the previously set location
      if (this.currentAddress && (this.currentAddress != null) && this.currentAddress.geo) {
        this.latitude = this.currentAddress.geo.lat;
        this.longitude = this.currentAddress.geo.lng;
        resolve();
        return false;
      }
      // load current your location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
          }
          resolve();
        });
      }
    })
  }
}