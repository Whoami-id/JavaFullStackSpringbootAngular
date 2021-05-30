import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../classes/product';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private httpClient: HttpClient) { }




  getPruduct(): Observable<any>{
    return this.httpClient.get('http://jsonplaceholder.typicode.com/posts/1/comments');
  }
  
}


