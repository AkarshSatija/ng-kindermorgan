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
import {MatDatepickerModule, MatInputModule,MatNativeDateModule,MatProgressSpinnerModule} from '@angular/material';


import { ContractService } from './contract.service';


@NgModule({
  declarations: [
    AppComponent
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
    SignaturePadModule
  //  AngularSignaturePadModule.forRoot()
  
  ],
  providers: [ContractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
