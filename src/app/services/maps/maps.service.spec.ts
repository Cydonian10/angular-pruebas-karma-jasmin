import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService],
    });
    service = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getCurrectPosition', () => {
    it('should save the center', () => {
      //arrange
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
        (successFn) => {
          const mockGeolocation = {
            coords: {
              accuracy: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              heading: 0,
              latitude: 500,
              longitude: 200,
              speed: 0,
            },
            timestamp: 0,
          };
          successFn(mockGeolocation);
        }
      );

      //
      service.getCurrectPosition();

      expect(service.center.lat).toEqual(500);
      expect(service.center.lng).toEqual(200);
    });
  });
});
