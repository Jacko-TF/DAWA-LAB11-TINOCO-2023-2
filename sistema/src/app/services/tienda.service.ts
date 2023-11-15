import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tienda } from '../models/tienda';

@Injectable({
    providedIn: 'root'
})
export class TiendaService{
    url = 'http://localhost:4000/api/tiendas/';

    constructor(private http: HttpClient) {

    }

    obtenerTiendasPorDistrito(id:string): Observable<any>{
        return this.http.get(this.url+"distrito/" + id);
    }

    obtenerMapTiendasPorDistrito(id:string): Observable<any>{
        return this.http.get(this.url+"distrito/map/" + id);
    }

    actualizarTienda(id:string, tienda: Tienda):Observable<any>{
        return this.http.put(this.url+id, tienda);
    }

    eliminarTienda(id:string):Observable<any>{
        return this.http.delete(this.url+id);
    }

    viewTienda(id:string):Observable<any>{
        return this.http.get(this.url+id);
    }
}