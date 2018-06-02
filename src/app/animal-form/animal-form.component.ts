import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AnimalsService } from '../animals.service';
import { Animal } from '../animal';
import {ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import { FormControl } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { Router } from '@angular/router';



@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent implements OnInit {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;

  public newAnimal: Animal = new Animal();
  animal : any;

  separatorKeysCodes = [ENTER];
  
  shotCtrl = new FormControl();

  filteredShots: Observable<any[]>;

  allShots = [
  	'Rabies',
  	'Distemper',
  	'Parvovirus',
  	'CAV-1',
  	'CAV-2'
  ];

  @ViewChild('shotInput') shotInput: ElementRef;

  constructor(private animalsService: AnimalsService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router) { 
  	this.filteredShots = this.shotCtrl.valueChanges.pipe(
  		startWith(null),
  		map((shot: string | null) => shot ? this.filter(shot) : this.allShots.slice()));

  	iconRegistry.addSvgIcon(
        'cancel',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/cancel.svg'));
  }

  add(event: MatChipInputEvent): void {
  	const input = event.input;
  	const value = event.value;
  
  	if((value || '').trim()) {
  		this.newAnimal.shots.push(value.trim());
  	}

  	if(input){
  		input.value='';
  	}

  	this.shotCtrl.setValue(null);
  }

  remove(shot:any): void {
  	const index = this.newAnimal.shots.indexOf(shot);

  	if(index >=0) {
  		this.newAnimal.shots.splice(index, 1);
  	}
  }

  filter(name: string) {
  	return this.allShots.filter(shot =>
  		shot.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
  	this.newAnimal.shots.push(event.option.viewValue);
  	this.shotInput.nativeElement.value = '';
  	this.shotCtrl.setValue(null);
  }




  ngOnInit() {
  	this.newAnimal.shots = [];
  }

  create() {
  	this.animalsService.createAnimal(this.newAnimal)
  		.subscribe(animal => {
  			this.animal = animal.data;
  			console.log(this.animal);
  			this.router.navigate(['/animals']);
  		});
  }

}
