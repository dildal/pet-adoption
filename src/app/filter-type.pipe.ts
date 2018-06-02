import { Pipe, PipeTransform } from '@angular/core';

/* Filter the data based on aniaml type
 * call w/{{animal | filterType:type}}
 * defaults to other(not cat or dog)
*/

@Pipe({
	name: 'filterType'
})

export class FilterTypePipe implements PipeTransform {
	transform(animals: any[], type: string): any[] {
		if(!animals) return [];
		if(!type) {
			return animals.filter(animal => animal.type.toLowerCase() !== 'cat' && animal.type.toLowerCase() !== 'dog');
		}

		return animals.filter(animal => animal.type.toLowerCase() === type);
	}
}