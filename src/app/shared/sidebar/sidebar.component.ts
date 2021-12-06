import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  /**
   * todo: get historial from gifsService y render en sidebar
   */

  get historial() {
    return this._gifsSev.historial
  }

  constructor(private _gifsSev: GifsService) { }

  buscar(termino: string) {
    return this._gifsSev.buscarGifs(termino)
  }

  ngOnInit(): void {
  }

}
