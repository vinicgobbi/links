import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Link {
  name: string
  link: string
}

@Injectable({
  providedIn: 'root'
})
export class Data {

  constructor(private http: HttpClient){ }

  getLinks(): Observable<Link[]> {

    return this.http.get<Link[]>('./assets/links.json');
  }
}
