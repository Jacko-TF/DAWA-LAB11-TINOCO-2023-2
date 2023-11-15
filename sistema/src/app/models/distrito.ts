export class Distrito {
    _id?: string;
    nombre: string;
    departamento: string;
    cantidadDeTiendas: number;
  
    constructor(nombre: string, departamento: string, cantidadDeTiendas: number) {
      this.nombre = nombre;
      this.departamento = departamento;
      this.cantidadDeTiendas = cantidadDeTiendas;
    }
  }