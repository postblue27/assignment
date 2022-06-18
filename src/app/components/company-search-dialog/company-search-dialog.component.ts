import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { Company } from 'src/app/models/company';
import { Region } from 'src/app/models/region';
import { CommonService } from 'src/app/service/common-service';

@Component({
  selector: 'app-company-search-dialog',
  templateUrl: './company-search-dialog.component.html',
  styleUrls: ['./company-search-dialog.component.scss']
})
export class CompanySearchDialogComponent implements OnInit, OnDestroy {
  companies: Company[] = [];
  filteredCompanies: Company[] = [];
  regions: Region[] = [];
  regionNames: string[] = [];
  subscriptions: Subscription[] = [];
  sortKey!: Region;
  searchString: string = '';
  selectedRegion: Region | null = null;
  constructor(private commonService: CommonService, public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.getCompanies();
    this.getRegions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  getCompanies() {
    this.subscriptions.push((this.commonService.getCompanies() as Observable<Company[]>).subscribe(companies => {
      this.companies = companies;
      this.filteredCompanies = companies;
    }));
  }

  getRegions() {
    this.subscriptions.push((this.commonService.getRegions() as Observable<Region[]>).subscribe(regions => {
      this.regions = regions;
      this.regions.forEach(region => {
        this.regionNames.push(region.name);
      })
    }));
  }

  onRegionChange(event: any): void {
    this.selectedRegion = event.value as Region;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredCompanies = this.companies.filter(company => {
      //applying region filter
      if(this.selectedRegion) {
        if(company.region_id != this.selectedRegion.id) 
          return false;
      }
      //applying search string
      if(this.searchString) {
        if( !this.searchStringLowerCaseEqualityCheck(
            this.searchString, 
            company.name, 
            company.region_id, 
            company.industry, 
            company.sector)) {
          return false;
        }
      }
      return true;
    });
  }

  clearFilters(): void {
    this.searchString = '';
    this.selectedRegion = null;
    this.applyFilters();
  }

  searchStringLowerCaseEqualityCheck(searchString: string, ...searchArray: string[]): boolean {
    for(let s in searchArray) {
      if(searchArray[s].toLowerCase().includes(searchString.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  selectCompany(company: Company) {
    this.ref.close(company);
  }
}
