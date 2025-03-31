import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;
@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[]): any {
    const noImage = './assets/images/no-image.jpg';
    const image = value.at(0);

    if (typeof value === 'string') {
      return `${BASE_URL}/files/product/${value}`;
    }

    if (!image) {
      return noImage;
    }

    return `${BASE_URL}/files/product/${image}`;
  }
}
