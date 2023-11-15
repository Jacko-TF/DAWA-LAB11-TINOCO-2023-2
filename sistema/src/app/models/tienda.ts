import { Distrito } from "./distrito";
export class Tienda {
    _id?: string;
    nombre: string;
    distrito: Distrito;
    latitud: number;
    longitud: number;
  
    constructor(nombre: string, distrito: Distrito, latitud: number, longitud: number) {
      this.nombre = nombre;
      this.distrito = distrito;
      this.latitud = latitud;
      this.longitud = longitud;
    }
  }