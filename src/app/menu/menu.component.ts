import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../animals.service';
import { Animal } from '../animal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})

export class MenuComponent implements OnInit {

  animals: Animal[];


  constructor(private animalsService: AnimalsService) { }


  ngOnInit() {
	  this.animalsService.getAnimals()
	  		.subscribe(animals => {
	  			this.animals = animals.data;
          console.log(this.animals);
	  		})
  }

}
