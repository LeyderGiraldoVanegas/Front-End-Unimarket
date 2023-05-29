import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { UsuarioGetDTO } from '../modelo/usuario-get-dto';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private userUrl = "http://localhost:8091/api/usuario";
  usuario: UsuarioGetDTO[];
  
  

  public listar(): UsuarioGetDTO[] {
    return this.usuario;
  }
  public obtenerUsuario(codigoUsuario: number):UsuarioDTO | undefined {
    return this.usuario.find(u => u.codigo == codigoUsuario);
  }
  
  
  
  constructor(private http: HttpClient) {this.usuario =[] }

  public crear(codigo: number, usuario: UsuarioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/crear`, usuario);
  }
 
  public actualizar(codigo: number, usuario: UsuarioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.userUrl}/actualizar/${codigo}`, usuario);
  }
  public eliminar(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userUrl}/eliminar/${codigo}`);
  }
  public obtener(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/obtener/${codigo}`);
  }

  public cambiarContrasena(codigo: number,pass:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/cambiarContrasena/${codigo}/${pass}`);
  }
}