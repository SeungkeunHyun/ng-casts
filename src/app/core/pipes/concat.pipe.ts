import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concat'
})
export class ConcatPipe implements PipeTransform {

  transform(value: string, len: number): string {
    if (!value) {
      return;
    }
    if (value.length > len) {
      return value.substring(0, len) + '...'
    }
    return value;
  }

}
