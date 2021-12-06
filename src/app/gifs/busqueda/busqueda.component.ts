import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  /**
   * @ViewChild
   * permite leer y modificar elementos en la vista
   * @param txtBuscar es la ref local en la vista
   */  
   @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement> // * ! non null assertion operator (typescript no javascript)

  constructor(private _gifsServ: GifsService) { }

  ngOnInit(): void {
  } 

  buscar() {
    const valor = this.txtBuscar.nativeElement.value

    if(valor.trim().length === 0) { return }
    
    this._gifsServ.buscarGifs(valor)

    // *limpiar el input tras la busqueda, esta bindeado al DOM
    this.txtBuscar.nativeElement.value = ''
  }
}
