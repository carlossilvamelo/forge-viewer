import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgeViewerFrameComponent } from './components/forge-viewer-frame/forge-viewer-frame.component';
import { ViewerModule } from 'ng2-adsk-forge-viewer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
@NgModule({
  declarations: [
    AppComponent,
    ForgeViewerFrameComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
