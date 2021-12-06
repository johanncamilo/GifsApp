import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' // * con esto no tengo que declarar el service en el module
})
export class GifsService {

  private apiKey: string = 'Yw5FL5OtUqsPEzdS8nIksmLqFSJJTzpI'
  private url: string = 'https://api.giphy.com/v1/gifs'
  private _historial: string[] = []

  // TODO cambiar any por su tipo (DONE)
  public resultados: Gif[] = []

  get historial() {
    return [...this._historial]
  }
  
  // * CONSTRUCTOR
  /** @importante : el constructor se ejecuta solo una vez porque los servicios trabajan como singleton */
  constructor(private _http: HttpClient) {
    // * GET HISTORIAL FROM LOCAL STORAGE
    
    /** @forma_A */
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    
    /** @forma_B */
    // if(localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)
    // }

    // TODO aplicar localStorage a los resultados en dos pasos: 1) persistir y serializar. 2) leer en el constructor
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
  }
  
  // *** MAIN METHOD BUSCAR ***
  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase()

    if(!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,10)

      localStorage.setItem('historial', JSON.stringify(this._historial))
    }
    // console.log(this._historial);

    /** @obj para manejar parametros similar a postman, simplifica parametros en la petición */
    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query)

    console.log(params.toString());
    
    /**
    *  @HttpRequest
    *  @Observable
    *  @param params se puede sipmpificar en una sola palabra si la llave se llama igual q el valor segun ES6
    */
    this._http.get<SearchGifsResponse>(`${this.url}/search`, { params })
              .subscribe((resp) => {
                console.log(resp.data)
                this.resultados = resp.data
                localStorage.setItem('resultados', JSON.stringify(this.resultados))
              })
  }

  // * metodos buscar tradicionales
  async buscarGifs_conAsyncAwait(query: string = '') {
    query = query.trim().toLocaleLowerCase()

    if(!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,10)
    }

    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=Yw5FL5OtUqsPEzdS8nIksmLqFSJJTzpI&q=south park&limit=10')
    const data = await resp.json()
    console.log(data);
  }

  buscarGifs_conFetchTradicional(query: string = '') {
    query = query.trim().toLocaleLowerCase()

    if(!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,10)
    }

    fetch('https://api.giphy.com/v1/gifs/search?api_key=Yw5FL5OtUqsPEzdS8nIksmLqFSJJTzpI&q=south park&limit=10')
      .then( resp => {
        resp.json().then(data => console.log(data))
      })
  }
}
