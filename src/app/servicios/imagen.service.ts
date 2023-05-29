import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private imgURL = "http://localhost:8091/api/imagenes";
  constructor(private http: HttpClient) { }
  
  public subir(imagen: FormData): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.imgURL}/upload`, imagen);
  }
  public eliminar(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.imgURL}/${id}`);
  }
}
