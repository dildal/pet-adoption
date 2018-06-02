import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../animals.service';
import { Animal } from '../animal';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  
  animals: Animal[];

  constructor(private animalsService: AnimalsService) { }

  ngOnInit() {
  
  	this.animalsService.getAnimals()
  		.subscribe(animals => {
  			this.animals = animals.data;
  		})
  	}

}
