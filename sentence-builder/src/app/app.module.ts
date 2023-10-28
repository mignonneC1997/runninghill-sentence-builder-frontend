import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggerModule } from 'ngx-logger';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SentencesComponent } from './components/sentences/sentences.component';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SentencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: false,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
      timeOut: 4000
    }),
    LoggerModule.forRoot(environment.logging)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
