import { Injectable } from '@angular/core';
import { ProductoGetDTO } from '../modelo/producto-get-dto';
import { ProductoDTO } from '../modelo/producto-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { ComentarioGetDTO } from '../modelo/comentario-get-dto';
import { ComentarioDTO } from '../modelo/comentario-dto';

@Injectable({
    providedIn: 'root'
})
export class ComentarioService {
    

    private authURL = "http://localhost:8091/api/comentario";
    comentarios: ComentarioGetDTO[];

    constructor(private http: HttpClient) {
        this.comentarios = [];
        
    }
    public ListarComentarios(codigoProducto:number): Observable<MensajeDTO> {
        return this.http.get<MensajeDTO>(`${this.authURL}/listar/${codigoProducto}`);
      }

      public  agregarComentario(comentario: ComentarioDTO): Observable<MensajeDTO>{
        return this.http.post<MensajeDTO>(`${this.authURL}/crear`,comentario);
      }
}