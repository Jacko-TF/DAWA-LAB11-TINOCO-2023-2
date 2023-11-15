import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2'
import { Distrito } from 'src/app/models/distrito';
import { DistritoService } from 'src/app/services/distrito.service';
import { Tienda } from 'src/app/models/tienda';
import { TiendaService } from 'src/app/services/tienda.service';

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  },
  label: {
    color: string;
    text: string;
    fontSize: string;
    fontWeight: string;
  },
  title: string,
  info: string
};

@Component({
  selector: 'app-listar-distritos',
  templateUrl: './listar-distritos.component.html',
  styleUrls: ['./listar-distritos.component.css']
})
export class ListarDistritosComponent implements OnInit {
  listDistritos: Distrito[] = [];

  elementos: number = 0;

  center: google.maps.LatLngLiteral = { lat: -12.037763, lng: -76.994141 };

  zoom: number = 10;

  @ViewChild('map') mapElement!: ElementRef;

  private map: google.maps.Map | undefined;

  constructor(private _distritoService: DistritoService, private _tiendaService: TiendaService) { }

  ngOnInit(): void {
      this.obtenerDistritos();
      //this.obtenerDistritosMap();
   }

  actualizarPosicion(lat: number, lng: number, zm: number): void {
    this.center = { lat, lng };
    this.zoom = zm
  }

  markers: MarkerProperties[] = [];

  handleMapInitialized(map: google.maps.Map) {
    this.map = map;
    this.markers.forEach((marker: MarkerProperties) => {
      new google.maps.Marker({
        position: marker.position,
        label: marker.label,
        map: this.map,})
    });
  }
  
  obtenerDistritos() {
    this._distritoService.getDistritos().subscribe(data => {
      this.listDistritos = data;
      this.elementos = this.listDistritos.length;
    })
  }

  obtenerDistritosMap(){
    this._distritoService.getDistritosMap().subscribe(data => {
      this.markers = data;
      this.reemplazarMarkers()
      console.log(this.markers)
    })
  }

  eliminarDistrito(id: any){
      Swal.fire({
        title: 'Eliminacion de Distrito',
        text: "¿Desea eliminar el distrito?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this._distritoService.deleteDistrito(id).subscribe(data => {
            console.log(data);
            this.obtenerDistritos();
            this.elementos = this.listDistritos.length;
          })
      }
      })
  }

  verTiendas(id:any){
    console.log(this.markers)
    console.log(this.markers)
    this._tiendaService.obtenerMapTiendasPorDistrito(id).subscribe(data => {
      this.markers = data;
      this.markers.forEach((marker: MarkerProperties) => {
        new google.maps.Marker({
          position: marker.position,
          label: marker.label,
          map: this.map,})
          this.actualizarPosicion(marker.position.lat, marker.position.lng, 12)
      });
    })
  }

  reemplazarMarkers(){
    this.markers.forEach((marker: MarkerProperties) => {
      new google.maps.Marker({
        position: marker.position,
        label: marker.label,
        map: this.map,})
    });
  }
}

