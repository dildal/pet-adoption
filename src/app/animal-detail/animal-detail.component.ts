import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AnimalsService } from '../animals.service';
import { Animal } from '../animal';
import {ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import { FormControl } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry, MatSnackBar} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlue: boolean = false;

  animals: Animal[];
  animal: Animal;
  shots: String[];
  adoptionDay;
  id = this.route.snapshot.paramMap.get('id');
  edit: Boolean = false;

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

  constructor(private animalsService: AnimalsService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private route: ActivatedRoute, public snackBar: MatSnackBar, private router: Router) {
    this.route.params.subscribe(() => {
      this.getAnimal();
    });

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
      this.animal.shots.push(value.trim());
    }

    if(input){
      input.value='';
    }

    this.shotCtrl.setValue(null);
  }

  remove(shot:any): void {
    const index = this.animal.shots.indexOf(shot);

    if(index >=0) {
      this.animal.shots.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.allShots.filter(shot =>
      shot.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.animal.shots.push(event.option.viewValue);
    this.shotInput.nativeElement.value = '';
    this.shotCtrl.setValue(null);
  }

  ngOnInit() {


  	this.getAnimal();

     this.animalsService.getAnimals()
      .subscribe(animals => {
        this.animals = animals.data;
      })
  }

  getAnimal(): void {
    const id = this.route.snapshot.paramMap.get('id');
  	this.animalsService.showAnimal(this.id)
  		.subscribe(animal => {
  			this.animal = animal.data[0];
  		});
  }

  openSnackBar() {
    const id = this.route.snapshot.paramMap.get('id');
    this.snackBar.open(`${this.animal.name} can't wait to meet you on ${this.adoptionDay.format("MMM Do YY")}`, null, {duration: 4000,});
    this.animalsService.deleteAnimal(this.id)
      .subscribe(()=> {
        this.router.navigate(['/animals']);
      });
  }

  update(): void{
    this.animalsService.editAnimal(this.id, this.animal)
      .subscribe((json) => {
        this.snackBar.open(`${json.data.name} successfully updated`, null, {duration: 2000});
      });
  }


}
