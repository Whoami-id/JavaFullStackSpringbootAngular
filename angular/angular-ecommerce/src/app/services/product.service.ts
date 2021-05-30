import { ProductCategory } from './../common/product-category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
 

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor( private httpCleint: HttpClient) { }


getProductList(theCategoryId: number): Observable<Product[]>{
  // build url based category id
  const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`; 
  return this.getProducts(searchUrl);
}

getProductListPaginate(thePage: number,thePageSize: number, theCategoryId: number): Observable<GetResponseProduct>{
  // build url based category id, page , size
  const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` + `&page=${thePage}&size=${thePageSize}`; 
  return this.httpCleint.get<GetResponseProduct>(searchUrl);
}


getProductCategories(): Observable<ProductCategory[]> {
  return this.httpCleint.get<GetResponseCategory>(this.categoryUrl).pipe(
    map(response => response._embedded.productCategory)
  );
}

searchProducts(theKeyword: string): Observable<Product[]> {
  const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
  return this.getProducts(searchUrl);
}

searchProductPaginate(thePage: number,thePageSize: number, theKeyword: string): Observable<GetResponseProduct>{
  // build url based category keyword, page , size
  const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` + `&page=${thePage}&size=${thePageSize}`;
  return this.httpCleint.get<GetResponseProduct>(searchUrl);
}

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpCleint.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpCleint.get<Product>(productUrl);
  }
  
}

interface GetResponseProduct{
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}


interface GetResponseCategory{
  _embedded: {
    productCategory: ProductCategory[];
  };
}

