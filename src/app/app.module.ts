import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CellComponent } from './components/cell/cell.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
