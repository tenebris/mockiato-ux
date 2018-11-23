import {inject, TestBed} from '@angular/core/testing';
import {Auth0AuthenticationService} from './auth0-authentication.service';
import {Router} from '@angular/router';

describe('Auth0AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Auth0AuthenticationService = TestBed.get(Auth0AuthenticationService);
    expect(service).toBeTruthy();
  });
});

describe('Auth0AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Auth0AuthenticationService,
        {
          provide: Router, useValue: {
            navigate: () => {
            }
          }
        }]
    });
  });

  it('should ...', inject([Auth0AuthenticationService], (service: Auth0AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
