import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AnimalsComponent } from './animals/animals.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { AnimalFormComponent } from './animal-form/animal-form.component';

const routes: Routes = [
	{ path: 'animals', component: AnimalsComponent},
	{ path: 'animal-details/:id', component: AnimalDetailComponent},
	{ path: 'animal/new', component: AnimalFormComponent},
	{ path: '', redirectTo: 'animals', pathMatch: 'full'},
	{ path: '**', redirectTo: 'animals', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
  	RouterModule
  ]
})

export class AppRoutingModule { }
