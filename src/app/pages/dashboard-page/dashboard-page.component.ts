import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../models/product.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class DashboardPageComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  isEditing = false;
  currentProductId: string | null = null;
  buttonText = 'Adicionar Produto';
  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 5;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      stock: [0],
      imageUrl: ['']
    });
  }
  trackById(index: number, item: any): number {
    return item.id;
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.page, this.pageSize, this.searchTerm).subscribe(response => {
      this.products = response.data;
    });
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.addProduct(newProduct).subscribe(() => {
        this.loadProducts();
        this.productForm.reset();
        this.buttonText = 'Adicionar Produto';
      });
    }
  }

  updateProduct(): void {
    if (this.productForm.valid && this.currentProductId) {
      const updatedProduct: Product = this.productForm.value;
      this.productService.updateProduct(this.currentProductId, updatedProduct).subscribe(() => {
        this.loadProducts();
        this.cancelEdit();
      });
    }
  }

  editProduct(product: Product): void {
    this.isEditing = true;
    this.currentProductId = product.id;
    this.productForm.patchValue(product);
    this.buttonText = 'Salvar Alterações';
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter(product => product.id !== productId);
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.currentProductId = null;
    this.productForm.reset();
    this.buttonText = 'Adicionar Produto';
  }
}
