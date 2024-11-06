import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
  imports: [
    CommonModule,        
    MatCardModule,       
    MatButtonModule,     
    MatIconModule,     
    HttpClientModule
  ]
})
export class ProductListPageComponent implements OnInit {
  products: Product[] = [];

  constructor(@Inject(ProductService) private productService: ProductService) {}

  trackById(index: number, item: any): number {
    return item.id;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(response => {
      this.products = response.data;
    });
  }
}
