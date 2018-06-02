import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Animal } from './animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  constructor(private http : Http) { }

  getAnimals() {
  	return this.http.get('/api/animals').pipe(
  		map(res => res.json())
  	);
  }

  createAnimal(animal: Animal){
  	return this.http.post('api/animals', animal).pipe(
      map(res => res.json())
    );
	}
  
  showAnimal(id){
  	return this.http.get('api/animals/'+id).pipe(
  		map(res => res.json())
  	);
  }

  deleteAnimal(id){
    return this.http.delete('api/animals/'+id);
  }

  editAnimal(id, animal: Animal){
    return this.http.put('api/animals/'+id, animal).pipe(
      map(res => res.json())
    );
  }
}
