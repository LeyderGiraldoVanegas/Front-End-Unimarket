import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './servicios/token.service';
import { SesionService } from './servicios/sesion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'UniMarket';
  fecha = 'Mayo de 2023'; //lo puede quitar, no es necesario
  isLogged = false;
  email: string = "";
  isMod = false;
  rol: string = "";
  usuario: number = 0;

  constructor(private router: Router, private tokenService: TokenService, private sesionService: SesionService) {
    this.usuario = tokenService.getCodigoUsuario();

  }
  //ngOnInit(): void {
  //this.isLogged = this.tokenService.isLogged();
  //if (this.isLogged) {
  //this.email = this.tokenService.getEmail();
  //}
  //}

  ngOnInit(): void {
    const objeto = this;
    this.sesionService.currentMessage.subscribe({
      next: data => {
        objeto.actualizarSesion(data);
      }
    });
    this.actualizarSesion(this.tokenService.isLogged());
  }
  private actualizarSesion(estado: boolean) {
    this.isLogged = estado;
    //this.isMod = true;
    if (estado) {
      this.email = this.tokenService.getEmail();
    } else {
      this.email = "";
    }
    if (true) {
      this.rol = "MODERADOR";
    }
  }

  public logout() {
    this.tokenService.logout();
  }

  public iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(["/busqueda", valor]);
    }
  }


}
