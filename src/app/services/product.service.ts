
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../pages/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Produtos simulados
  private products: Product[] = [
    { id: '1', name: 'Produto A', description: 'Descrição do Produto A', price: 50, stock: 10, imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Produto B', description: 'Descrição do Produto B', price: 100, stock: 5, imageUrl: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Produto C', description: 'Descrição do Produto C', price: 150, stock: 2, imageUrl: 'https://via.placeholder.com/150' },
  ];

  // Obtém todos os produtos
  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  // Adiciona um novo produto
  addProduct(product: Product): Observable<Product> {
    const newProduct = { ...product, id: (this.products.length + 1).toString() };
    this.products.push(newProduct);
    return of(newProduct);
  }

  // Atualiza um produto existente
  updateProduct(productId: string, updatedProduct: Product): Observable<Product> {
    const index = this.products.findIndex(p => p.id === productId);
    if (index !== -1) {
      this.products[index] = { ...updatedProduct, id: productId };
      return of(this.products[index]);
    }
    return of(null as any);
  }

  // Remove um produto
  deleteProduct(productId: string): Observable<void> {
    this.products = this.products.filter(p => p.id !== productId);
    return of();
  }
}