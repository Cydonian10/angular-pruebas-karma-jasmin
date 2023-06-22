import { Component, Input } from '@angular/core';
import { Product } from '../../models/general.model';

@Component({
  selector: 'app-product',
  template: `
    <figure>
      <img
        class="card-image-top"
        [src]="product.images[0]"
        height="150"
        style="object-fit: contain; width:100%"
      />
    </figure>
    <figcaption style="font-size: 14px;" class="h6">
      {{ product.title }} -- {{ product.price }}
    </figcaption>
  `,
  styles: [],
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
}
