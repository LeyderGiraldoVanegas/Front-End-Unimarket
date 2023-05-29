import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { SesionDTO } from 'src/app/modelo/sesion-dto';
import { TokenDTO } from 'src/app/modelo/token-dto';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  sesion: SesionDTO;
  alerta!: Alerta;
  usuario: UsuarioDTO;
  codigoUsuario: number = 0;
  bandera: boolean;

  constructor(private authService: AuthService, private tokenService: TokenService,
    private usuarioService: UsuarioService, private route: ActivatedRoute) {
    this.sesion = new SesionDTO();
    this.usuario = new UsuarioDTO;
    this.bandera = false;



  }

  public async login() {
    const objetoUsuario = this.authService.buscarUsarioCorreo(this.sesion.email);

    const objeto = this;
    this.authService.login(this.sesion).subscribe({
      next: data => {
        objeto.tokenService.login(data.respuesta.token, data.respuesta.refreshToken);
        objeto.alerta = new Alerta("Login correcto", "success");
      },
      error: error => {
        objeto.alerta = new Alerta(error.error.respuesta, "danger");
        alert("Usuario o contraseña no validos");
      }
    });


  }

}






