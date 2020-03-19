import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Zip } from './model/zip';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZipService {

  getAll(): Observable<Array<Zip>> {
    return of([
      { code: '1111', city: 'Budapest' },
      { code: '4000', city: 'Debrecen' },
      { code: '6700', city: 'Szeged' },
      { code: '8200', city: 'Veszprem' },
      { code: '8230', city: 'Balatonfured' },
    ]);
  }

  findByCode(code: string): Observable<Array<Zip>> {
    return this.getAll()
      .pipe(map(zips => zips
        .filter(zip => zip.code.startsWith(code))));
  }

  findByCity(city: string): Observable<Array<Zip>> {
    return this.getAll()
      .pipe(map(zips => zips
        .filter(zip => zip.city.toLocaleLowerCase().startsWith(city.toLocaleLowerCase()))));
  }
}
