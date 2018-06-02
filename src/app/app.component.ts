import { Component } from '@angular/core';
import { AnimalsService } from './animals.service';
import { Animal } from './animal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  animals: Animal[];


  constructor(private animalsService: AnimalsService) { }

  ngOnInit() {
	  this.animalsService.getAnimals()
	  	.subscribe(animals => {
	  	  this.animals = animals.data;
	  })
  }
}
