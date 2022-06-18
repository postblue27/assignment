import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/models/company';
import { CommonService } from 'src/app/service/common-service';
import { CompanySearchDialogComponent } from '../company-search-dialog/company-search-dialog.component';


@Component({
  selector: 'app-stockviz-sidebar',
  templateUrl: './stockviz-sidebar.component.html',
  styleUrls: ['./stockviz-sidebar.component.scss']
})
export class StockvizSidebarComponent implements OnInit, OnDestroy {
  display = true;
  ref!: DynamicDialogRef;
  subscriptions: Subscription[] = [];
  constructor(private commonService: CommonService, public dialogService: DialogService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  showCompaniesDialog(): void {
    this.ref = this.dialogService.open(CompanySearchDialogComponent, {
      header: 'FIND COMPANY',
      width: '90%',
    });

    this.subscriptions.push(this.ref.onClose.subscribe((company: Company) =>{
      if (company) {
          this.commonService.companyChange.next(company);
      }
    }));
  }

}
