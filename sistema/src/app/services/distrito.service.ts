import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DistritoService{
    url = 'http://localhost:4000/api/distritos/';

    constructor(private http: HttpClient) {

    }

    getDistritos(): Observable<any>{
        return this.http.get(this.url);
    }

    deleteDistrito(id: string): Observable<any> {
        return this.http.delete(this.url + id);
    }

    getDistritosMap(): Observable<any>{
        return this.http.get(this.url + "map")
    }
}