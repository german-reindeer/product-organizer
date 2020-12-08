import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppRoutingService } from '../../routing/app-routing.service';
import { ProductOrganizerRoute } from '../../routing/product-organizer-route.enum';
import { ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { ProductQuery } from '../../state/product.query';
import { ProductService } from '../../state/product.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(
    private productQuery: ProductQuery,
    private productService: ProductService,
    private appRoutingService: AppRoutingService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute
  ) {
    this.buildForm();
    appRoutingService
      .selectCurrentRoute()
      .pipe(
        take(1),
        filter((route) => route === ProductOrganizerRoute.EDIT),
        map(() => this.activateRoute.snapshot.paramMap.get('id')),
        mergeMap((id) => this.productQuery.selectEntity(Number(id))),
        filter((product) => !!product)
      )
      .subscribe((product) => this.productForm.patchValue(product));
  }

  submit(): void {
    if (this.appRoutingService.getCurrentRoute() === ProductOrganizerRoute.EDIT) {
      this.productService.updateProduct(this.productForm.value);
    } else {
      this.productService.createProduct(this.productForm.value);
    }
  }

  private buildForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      id: [''],
    });
  }
}
