import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";
import { SesionService } from './sesion.service';
import { AuthService } from './auth.service';

const TOKEN_KEY = "AuthToken";
const CODIGO_CUENTA = "CodigoCuenta";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  

  private authURL = "http://localhost:8091/api/sesion";


  constructor(private router: Router, private http: HttpClient, private sesionService: SesionService
    , private authService: AuthService) { }

  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public login(token: string,refreshToken: string) {
    this.setToken(token);
    this.setToken(refreshToken);

    //buscar por correo
   // console.log("Entre"+this.getEmail());
    this.authService.buscarUsarioCorreo(this.getEmail()).subscribe({
      next: data =>{
        console.log("Entre "+data.respuesta.codigo);
        window.sessionStorage.removeItem(CODIGO_CUENTA);
        window.sessionStorage.setItem(CODIGO_CUENTA,data.respuesta.codigo)
        
      },
      error: error =>{
        console.log(error,error);
      }
    });

    this.sesionService.updateSession(true);
    this.router.navigate(["/"]);
  }
  
  //public login(sesion: SesionDTO): Observable<MensajeDTO> {
  //return this.http.post<MensajeDTO>(`${this.authURL}/login`, sesion);
  //}

  public logout() {
    window.sessionStorage.clear();
    this.sesionService.updateSession(false);
    this.router.navigate(["/"]);
  }

  private decodePayload(token: string): any {
    const payload = token!.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }

  public getEmail(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.sub;
    }
    return "";
  }

  public getRole(): string[] {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.roles;
    }
    return [];
  }

  public getCodigoUsuario(): number {
    //window.sessionStorage.removeItem(CODIGO_CUENTA);
    let codigo = window.sessionStorage.getItem(CODIGO_CUENTA);
    if(codigo != null){
      return Number.parseInt(codigo);
    }
    return -1;
  }
}
