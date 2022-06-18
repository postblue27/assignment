import { Component, OnDestroy, OnInit } from '@angular/core';
import { merge, mergeMap, Observable, Subscription } from 'rxjs';
import { Company } from 'src/app/models/company';
import { Region } from 'src/app/models/region';
import { CommonService } from 'src/app/service/common-service';
import { FormatNumberPipe } from '../../shared/pipe/format-number.pipe';
import { FormatCurrencyPipe } from '../../shared/pipe/format-currency.pipe';

@Component({
  selector: 'app-stockviz-company-details',
  templateUrl: './stockviz-company-details.component.html',
  styleUrls: ['./stockviz-company-details.component.scss']
})
export class StockvizCompanyDetailsComponent implements OnInit, OnDestroy {
  company: Company = <Company>{};
  companyRegion: Region = <Region>{};
  descriptionPlaceholder: string = '';
  subscriptions: Subscription[] = [];
  isDisplayFullDescription: boolean = false;
  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
    this.getFirstCompany();
    this.subscribeToCompanyChange();
    this.getCompanyDescriptionPlaceholder();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  subscribeToCompanyChange(): void {
    this.subscriptions.push(this.commonService.companyChange.subscribe((company: Company) => {
      this.company = company;
      this.getCompanyRegion(this.company);
    }));
  }

  getFirstCompany(): void {
    this.subscriptions.push((this.commonService.getCompanies() as Observable<Company[]>).subscribe(res => {
      this.company = res[0] as Company;
      this.getCompanyRegion(this.company);
    }));
  }

  getCompanyRegion(company: Company): void {
    this.subscriptions.push((this.commonService.getRegions() as Observable<Region[]>).subscribe(res => {
      this.companyRegion = res.find(r => r.id == company.region_id) as Region;
    }));
  }

  getCompanyDescriptionPlaceholder(): void {
    this.subscriptions.push(this.commonService.getCompanyDescriptionPlaceholder()
    .subscribe((response: any) => {
      this.descriptionPlaceholder = response.description;
    }));
  }
}
