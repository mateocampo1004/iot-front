import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IotShopService } from '../../services/iot-shop.service';
import { Validators as MyValidators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-update-product',
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
  ],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnChanges {
  @Input() product: any; // Agregado para que el componente pueda recibir el producto

  validateForm: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
    stock: FormControl<number>;
    price: FormControl<number>;
  }>;

  constructor(
    private service: IotShopService,
    private fb: NonNullableFormBuilder,
    private notification: NzNotificationService
  ) {
    const { required } = MyValidators;
    this.validateForm = this.fb.group({
      name: ['', [required]],
      description: ['', [required]],
      stock: [0, [required]],
      price: [0, [required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.setValues();
    }
  }

  setValues(): void {
    if (this.product) {
      this.validateForm.setValue({
        name: this.product.name || '',
        description: this.product.description || '',
        stock: this.product.stock || 0,
        price: this.product.price || 0,
      });
    }
  }

  submitFormProductUpdate() {
    if (this.validateForm.valid) {
      this.service.updateProduct(this.product.id, this.validateForm.value)
        .subscribe(() => {
          this.createNotification(
            'success',
            'Product Updated',
            'Product has been updated successfully'
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
}
