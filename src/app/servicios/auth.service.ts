import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SesionDTO } from '../modelo/sesion-dto';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { TokenDTO } from '../modelo/token-dto';

@Injectable({ 
  providedIn: 'root'
})
export class AuthService {
  
  private authURL = "http://localhost:8091/api/auth";
  constructor(private http: HttpClient) { }

  public login(sesion: SesionDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, sesion);
  }

  public registrar(usuario: UsuarioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/registro`, usuario);
  }

  public refresh(tokenDTO: TokenDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/refresh`, tokenDTO);
  }

  public buscarUsarioCorreo(gmail: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/obtenerGmail/${gmail}`);
  }

  
}


