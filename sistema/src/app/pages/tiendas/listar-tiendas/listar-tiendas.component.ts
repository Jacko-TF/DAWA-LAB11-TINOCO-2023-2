import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tienda } from 'src/app/models/tienda';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-tiendas',
  templateUrl: './listar-tiendas.component.html',
  styleUrls: ['./listar-tiendas.component.css']
})
export class ListarTiendasComponent implements OnInit{

  listTiendas: Tienda[] = [];

  elementos: number = 0;
  
  id: string | null ; 

  constructor( private aRouter: ActivatedRoute, private _tiendaService: TiendaService) {
    this.id = aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    console.log(this.id);
    this.obtenerTiendas();
    console.log(this.listTiendas);
  }

  obtenerTiendas() {
    if(this.id !== null){
      this._tiendaService.obtenerTiendasPorDistrito(this.id).subscribe(data => {
        this.listTiendas = data;
        this.elementos = this.listTiendas.length
      })
    }
  }

  eliminarTienda(id: any){
      Swal.fire({
        title: 'Eliminacion de Tienda',
        text: "¿Desea eliminar la tienda?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this._tiendaService.eliminarTienda(id).subscribe(data => {
            console.log(data);
            this.obtenerTiendas();
            this.elementos = this.listTiendas.length;
          })
        }
      })
    }
}
