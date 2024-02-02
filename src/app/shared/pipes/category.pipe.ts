import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
//esperando a implementação dos times no projeto para assim poder alterar os icones que mostrariam
// as camisas dos times com suas determinadas cores
