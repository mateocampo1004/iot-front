import { Component } from '@angular/core';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { NzFormDirective } from 'ng-zorro-antd/form';
import { NzFormItemComponent } from 'ng-zorro-antd/form';
import { NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormGroup, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { Validators as MyValidators } from '@angular/forms';
import { IotShopService } from '../../services/iot-shop.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductListComponent } from '../product-list/product-list.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzColDirective,
    ReactiveFormsModule,
    NzInputDirective,
    NzButtonComponent,
    NzInputNumberComponent,
    CommonModule,
    ProductListComponent,
    UpdateProductComponent,
    NgIf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  constructor(
    private service: IotShopService,
    private fb: NonNullableFormBuilder,
    private notification: NzNotificationService
  ) {
    const { required } = MyValidators;
    this.validateForm = this.fb.group({
      productName: ['', [required]],
      description: ['', [required]],
      unitPrice: [0, [required]],
      quantityInStock: [0, [required]],
      
    });
  }

  selectedProduct: any;

  validateForm: FormGroup<{
    productName: FormControl<string>;
    description: FormControl<string>;
    unitPrice: FormControl<number>;
    quantityInStock: FormControl<number>;
    
  }>;

  submitFormProduct(): void {
    if (this.validateForm.valid) {
      this.service.createProduct(this.validateForm.value).subscribe(() => {
        this.createNotification(
          'success',
          `${this.validateForm.value.productName}${this.validateForm.value.description}`,
          'The product was created successfully'
        );
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

  createNotification(type: string, title: string, content: string): void {
    this.notification.create(type, title, content);
  }

  onProductUpdate(): void {
    this.selectedProduct = null;
  }

  editProduct(product: any): void {
    this.selectedProduct = product;
  }
}
