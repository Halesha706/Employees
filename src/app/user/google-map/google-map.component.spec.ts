import { MapsAPILoader } from '@agm/core';
// import { NgZone } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapComponent } from './google-map.component';

describe('GoogleMapComponent', () => {
  let component: GoogleMapComponent;
  let fixture: ComponentFixture<GoogleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleMapComponent],
      providers: [
        {
          provide: MapsAPILoader, useClass: GoogleMaps
        },
        // {
        //   provide: NgZone, useClass: NgZoneClass
        // }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class GoogleMaps {

}

// class NgZoneClass {

// }
