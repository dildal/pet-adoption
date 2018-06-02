import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatMenuModule, MatButtonModule, MatCardModule, MatSidenavModule, MatChipsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatIconModule, MatAutocompleteModule, MatDatepickerModule, MatSnackBarModule} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {MenuItem} from 'primeng/api';
import { FilterTypePipe } from './filter-type.pipe';
import {MenubarModule} from 'primeng/menubar';


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AnimalsComponent } from './animals/animals.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AnimalsComponent,
    AnimalDetailComponent,
    FilterTypePipe,
    AnimalFormComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MenubarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatChipsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatMomentDateModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
