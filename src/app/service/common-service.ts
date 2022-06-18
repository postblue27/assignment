import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Company } from '../models/company';
import { Region } from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class CommonService{
  companyChange: Subject<any> = new Subject();
  constructor(private http: HttpClient) {}

  getCompanies():Observable<Company[]>{
    return this.http.get<Company[]>('assets/companies.json');
  }
  getRegions():Observable<Region[]>{
    return this.http.get<Region[]>('assets/regions.json');
  }
  getCompanyDescriptionPlaceholder():Observable<any>{
    return this.http.get<any>('assets/company-details-description.json');
  }
}
