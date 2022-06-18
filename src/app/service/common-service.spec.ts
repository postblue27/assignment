import { TestBed } from '@angular/core/testing';

import { CommonService } from './common-service';

import companies from '../../assets/companies.json';
import regions from '../../assets/regions.json';
import description from '../../assets/company-details-description.json';
import { Company } from '../models/company';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Region } from '../models/region';

describe('CommonServiceService', () => {
  let service: CommonService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CommonService(httpClientSpy);
  });

  it('#getCompanies should be equal to companies imported from json',
    (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(companies));
      service.getCompanies().subscribe(
        returnedCompanies => {
          expect(returnedCompanies).toEqual(companies as Company[]);
          done();
        },
        error => done.fail
      );
      expect(httpClientSpy.get.calls.count())
        .toBe(1);
      }
  );

  it('#getRegions should be equal to regions imported from json',
    (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(regions));
      service.getRegions().subscribe(
        returnedRegions => {
          expect(returnedRegions).toEqual(regions as Region[]);
          done();
        },
        error => done.fail
      );
      expect(httpClientSpy.get.calls.count())
        .toBe(1);
      }
  );

  it('#getCompanyDescriptionPlaceholder should be equal to description imported from json',
    (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(description));
      service.getCompanyDescriptionPlaceholder().subscribe(
        descriptionObj => {
          expect(descriptionObj.description).toEqual(description.description);
          done();
        },
        error => done.fail
      );
      expect(httpClientSpy.get.calls.count())
        .toBe(1);
      }
  );
});
