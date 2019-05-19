import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// IMPORT YOUR LIBRARY
//import { AngularSignaturePadModule } from 'angular-signature-pad';

import { SignaturePadModule } from 'angular2-signaturepad';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatInputModule,MatNativeDateModule,MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, MatExpansionModule, MatMenuModule, MatIconModule} from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ContractService } from './contract.service';
import { StartupComponent } from './startup/startup.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    StartupComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    SignaturePadModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule
    
  //  AngularSignaturePadModule.forRoot()

  ],
  providers: [ContractService],
  bootstrap: [StartupComponent]
})
export class AppModule { }
