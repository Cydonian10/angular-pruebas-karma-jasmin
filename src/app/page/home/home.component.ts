import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/general.model';
import { generateManyProducts } from 'src/app/models/product.mock';

@Component({
  selector: 'app-home',
  template: `
    <section class="container">
      <div class="my-grid">
        <article class="" *ngFor="let product of products">
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
        </article>
      </div>
    </section>
  `,
  styles: [
    `
      .my-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto;
        grid-gap: 15px;
      }
    `,
  ],
})
export class HomeComponent {
  public products: Product[] = [];

  constructor(private productSrv: ProductService) {}

  ngOnInit() {
    this.productSrv.getAllSimple().subscribe({
      next: (resp) => {
        this.products = resp;
      },
    });

    const data = generateManyProducts();
    console.log(data);
  }
}
