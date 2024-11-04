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

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
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
  buttonText = 'Adicionar Produto'; // Texto do botão que muda ao excluir
  isRemoving = false; // Controla o estado de remoção para desativar o botão temporariamente
  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 5;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef  // Injeta ChangeDetectorRef
  ) {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      stock: [0],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  // Método para adicionar um novo produto
  addProduct(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.addProduct(newProduct).subscribe(() => {
        this.loadProducts();  // Recarrega a lista de produtos
        this.productForm.reset();
        this.buttonText = 'Adicionar Produto'; // Reseta o texto do botão
      });
    }
  }

  // Método para atualizar um produto existente
  updateProduct(): void {
    if (this.productForm.valid && this.currentProductId) {
      const updatedProduct: Product = this.productForm.value;
      this.productService.updateProduct(this.currentProductId, updatedProduct).subscribe(() => {
        this.loadProducts();  // Recarrega a lista de produtos
        this.cancelEdit();
      });
    }
  }

  editProduct(product: Product): void {
    this.isEditing = true;
    this.currentProductId = product.id;
    this.productForm.patchValue(product);
    this.buttonText = 'Salvar Alterações'; // Altera o texto do botão ao editar
  }

  // Método para remover um produto e atualizar o texto do botão
  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter(product => product.id !== productId);

      // Exibe "Produto Removido" temporariamente no botão
      this.buttonText = 'Produto Removido';
      this.isRemoving = true;
      this.cdr.markForCheck();  // Atualiza a exibição imediatamente

      // Restaura o texto do botão após 2 segundos
      setTimeout(() => {
        this.buttonText = 'Adicionar Produto';
        this.isRemoving = false;
        this.cdr.markForCheck();  // Força outra atualização após o timeout
      }, 2000);
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.currentProductId = null;
    this.productForm.reset();
    this.buttonText = 'Adicionar Produto';
  }

  searchProducts(): void {
    this.page = 1; // Reset para a primeira página em uma nova busca
    this.loadProducts();
  }

  changePage(newPage: number): void {
    this.page = newPage;
    this.loadProducts();
  }
}