import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { ProductListComponent } from "../../components/product-list/product-list.component";

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  imports: [ProductComponent, ProductListComponent]
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
