import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generic'
})
export class GenericPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
