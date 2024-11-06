import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../pages/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Obtém produtos com paginação e busca
  getProducts(page = 1, limit = 10, description?: string): Observable<{ data: Product[], total: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    if (description) {
      params = params.set('descricao', description);
    }

    return this.http.get<{ data: Product[], total: number }>(`${this.apiUrl}/produtos`, { params }).pipe(
      catchError(error => {
        console.error('Erro ao obter produtos:', error);
        throw error;
      })
    );
  }

  
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/produtos`, product).pipe(
      catchError(error => {
        console.error('Erro ao adicionar produto:', error);
        throw error;
      })
    );
  }

  // Atualiza um produto existente
  updateProduct(productId: string, updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/produtos/${productId}`, updatedProduct).pipe(
      catchError(error => {
        console.error('Erro ao atualizar produto:', error);
        throw error;
      })
    );
  }

  // Remove um produto
  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/produtos/${productId}`).pipe(
      catchError(error => {
        console.error('Erro ao remover produto:', error);
        throw error;
      })
    );
  }
}
