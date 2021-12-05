import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  } 

  buscar() {
    const valor = this.txtBuscar.nativeElement.value
    console.log(valor);

    // *limpiar el input tras la busqueda, esta bindeado al DOM
    this.txtBuscar.nativeElement.value = ''
  }
}
