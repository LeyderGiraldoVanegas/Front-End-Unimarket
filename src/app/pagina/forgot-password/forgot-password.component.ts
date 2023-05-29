import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  email: number = 0;
  usuario: UsuarioDTO;

  constructor(private route: ActivatedRoute,private usuarioService: UsuarioService,private router:Router) {

    const objetoUsuario = this.usuarioService.obtenerUsuario(this.email);
    this.usuario = new UsuarioDTO;

    this.route.params.subscribe(params => {
      this.email = params["correo"];
      //console.log("correo: "+this.email);
      const objetoProducto = this.usuarioService.obtener(this.email);
      if (objetoProducto != null) {
        this.usuarioService.obtener(this.email).subscribe({
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
  ngOnInit(): void {
    
  }

 /**  public enviarContrasena(pass:string,pass1:string){
    if(pass === pass1){
      console.log("link: "+this.email+pass+pass1);
     const usuario =  this.usuarioService.cambiarContrasena(this.email,pass).subscribe({
      next: data => {
        alert("Contraseña modificada con exito: ");
        //routerLink="/login"
        //this.router.navigate(['/busquedaCategoria', categoria]);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.log(error.error);
        alert("Contraseña ERROR");
       // this.router.navigate(['/login']);
      }
     });
     
   
     // RouterLink = "login";
    }else{
      alert("Contraseña ERROR");
      
    }
    
    //this.router.navigate(['/login']);
  }*/

  public enviarContrasenaActualizar(pass:string,pass1:string) {
    
   // console.log("Entrar: " + this.usuario.password) 
  
   if(pass == pass1){
    this.usuario.password = pass;
    this.usuarioService.actualizar(this.email, this.usuario).subscribe(
      
      {
        next: data => {
          
          this.usuario = data.respuesta;
          alert("Usuario actualizado");
          this.router.navigate(['/login']);
        },
        error: err => {
          console.log(err.error)
          
        }
      }
    );
   }else{
    alert("Error al actualizar Usuario");
   }
   
  }

}
