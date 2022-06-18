import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockvizSidebarComponent } from './components/stockviz-sidebar/stockviz-sidebar.component';
import { StockvizCompanyDetailsComponent } from './components/stockviz-company-details/stockviz-company-details.component';
import { CompanySearchDialogComponent } from './components/company-search-dialog/company-search-dialog.component';
import { FormatNumberPipe } from './shared/pipe/format-number.pipe';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {DividerModule} from 'primeng/divider';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import { AutofocusDirective } from './shared/directive/autofocus.directive';
import { FormatCurrencyPipe } from './shared/pipe/format-currency.pipe';


const primeNgModules = [
  SidebarModule,
  ButtonModule,
  DataViewModule,
  DynamicDialogModule,
  DropdownModule,
  InputTextModule,
  DividerModule,
  TableModule,
  CardModule
]

@NgModule({
  declarations: [
    AppComponent,
    StockvizSidebarComponent,
    StockvizCompanyDetailsComponent,
    CompanySearchDialogComponent,
    FormatNumberPipe,
    FormatCurrencyPipe,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ...primeNgModules,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
