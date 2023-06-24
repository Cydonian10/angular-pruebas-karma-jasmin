import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/general.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-detalle',
  template: `
    <p data-testid="type">Type: {{ queryType }}</p>
    <ng-container *ngIf="product">
      <div>
        <figure>
          <img
            class="card-image-top"
            [src]="product.images[0]"
            height="300"
            style="object-fit: contain; width:100%"
          />
        </figure>
        <figcaption
          data-testid="title"
          style="font-size: 14px;"
          class="h6 text-center"
        >
          {{ product.title }} -- {{ product.price }}
        </figcaption>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class DetalleComponent implements OnInit {
  @Input() id?: string;
  @Input('type') queryType?: string;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';

  public product: Product | null = null;

  private location = inject(Location);
  private productSrv = inject(ProductService);

  ngOnInit(): void {
    this.getProductDetail();
  }

  private getProductDetail() {
    if (this.id) {
      this.status = 'loading';
      this.productSrv.getOne(this.id).subscribe({
        next: (resp) => {
          this.status = 'success';
          this.product = resp;
        },
        error: () => {
          this.status = 'error';
          this.goToBack();
        },
      });
    } else {
      this.goToBack();
    }
  }

  goToBack() {
    this.location.back();
  }
}
