import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {
  constructor(private router: Router,private authService: AuthService) {

  }
  public recuperarContrasena(email: string) {
    console.log(email);
    this.authService.buscarUsarioCorreo(email).subscribe({
      next: data =>{
        console.log("Entre "+data.respuesta.codigo);
        //email = data.respuesta.codigo;
        if (email === data.respuesta.email) {
          email = data.respuesta.codigo;
          this.router.navigate(["/forgot-password",email  ]);
        }
      },
      error: error =>{
        console.log(error,error);
        alert("Usuario no encontrado");
      }
    });
    
    
  }
}
