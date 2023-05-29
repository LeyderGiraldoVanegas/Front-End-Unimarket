import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SesionDTO } from 'src/app/modelo/sesion-dto';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-my-perfil',
  templateUrl: './my-perfil.component.html',
  styleUrls: ['./my-perfil.component.css']
})
export class MyPerfilComponent {

  usuario: UsuarioDTO;
  codigoUsuario: number = 0;
  sesion: SesionDTO;

  constructor(private router: Router, private authService: AuthService,
    private route: ActivatedRoute, private usuarioService: UsuarioService
    , private tokenService: TokenService) {
    this.usuario = new UsuarioDTO;
    this.sesion = new SesionDTO();

    const objetoUsuario = this.usuarioService.obtenerUsuario(this.codigoUsuario);

    if (objetoUsuario != null) {
      this.usuario = objetoUsuario;
      console.log(objetoUsuario.nombre);
    }

    this.route.params.subscribe(params => {
      this.codigoUsuario = params["codigo"];

      const objetoProducto = this.usuarioService.obtener(this.codigoUsuario);
      if (objetoProducto != null) {
        this.usuarioService.obtener(this.codigoUsuario).subscribe({
          next: data => {
            this.usuario = data.respuesta;
            // console.log("Codigo usario: "+ data.respuesta.codigo );
          },
          error: err => {
            console.log(err.error)
          }
        });
      }
    });



  }
  public actualizarUsuario() {
    
    console.log("Entrar: " + this.usuario.password)
    this.usuarioService.actualizar(this.codigoUsuario, this.usuario).subscribe(
      {
        next: data => {
          this.usuario = data.respuesta;
          
          alert("Usuario actualizado");
        },
        error: err => {
          console.log(err.error)
          alert("Error al actualizar Usuario");
        }
      }
    );
  }

  public eliminarUsuario() {
    
    console.log("Entrar: " + this.usuario.password)
    this.usuarioService.eliminar(this.codigoUsuario).subscribe(
      {
        next: data => {
          this.usuario = data.respuesta;
          
          alert("Usuario eliminado");
          this.router.navigate(['/login']);
        },
        error: err => {
          console.log(err.error)
          alert("Error al eliminar Usuario");
        }
      }
    );

    this.tokenService.logout();
  }

}
