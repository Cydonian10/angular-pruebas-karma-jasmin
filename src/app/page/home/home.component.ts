import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/general.model';
import { generateManyProducts } from 'src/app/models/product.mock';

@Component({
  selector: 'app-home',
  template: `
    <section class="container">
      <div class="my-grid">
        <!-- <article *ngFor="let product of products"> -->
        <app-product
          [product]="product"
          *ngFor="let product of products"
        ></app-product>
        <!-- </article> -->
      </div>
      <button
        [disabled]="status === 'loading'"
        (click)="getAllProducts()"
        class="btn btn-primary"
      >
        Loas More
        <span *ngIf="status === 'loading'">...loading</span>
      </button>
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
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(private productSrv: ProductService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productSrv.getAll(this.limit, this.offset).subscribe({
      next: (resp) => {
        this.products = [...this.products, ...resp];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: (err) => {
        this.products = [];
        this.status = 'error';
      },
    });
  }
}
