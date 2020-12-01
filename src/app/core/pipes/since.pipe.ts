import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'since'
})
export class SincePipe implements PipeTransform {

  transform(value: Date): string {
    return Math.floor((new Date().getTime() - value.getTime()) / (60 * 1000)) + " min(s)"
  }

}
