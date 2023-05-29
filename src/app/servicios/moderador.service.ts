/**
 * public rechazarModerador(codigoProducto: number): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`http://localhost:8091/api/moderador/rechazar/${codigoProducto}`);
  }
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { ProductoDTO } from '../modelo/producto-dto';
@Injectable({
  providedIn: 'root'
})
export class ModeradorService {
  private userUrl = "http://localhost:8091/api/moderador";
  
  constructor(private http: HttpClient) { }


 
  public aprobarProducto(codigoProducto: number ): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/aprobar/${codigoProducto}`);
  }

  public rechazarProducto(codigoProducto: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/rechazar/${codigoProducto}`);
  }

  
}