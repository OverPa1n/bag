import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { VacancieListComponent } from './vacancie-list/vacancie-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatGridListModule} from "@angular/material/grid-list";
import { GridListComponent } from './grid-list/grid-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsFilterComponent } from './questions/questions-filter/questions-filter.component';
import { QuestionsListComponent } from './questions/questions-list/questions-list.component';
import { EditModalComponent } from './questions/edit-modal/edit-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DialogEditComponent } from './questions/dialog-edit/dialog-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    VacancieListComponent,
    GridListComponent,
    QuestionsComponent,
    QuestionsFilterComponent,
    QuestionsListComponent,
    EditModalComponent,
    DialogEditComponent,

  ],
  // entryComponents: [DialogEditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
