import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { UsuarioGetDTO } from 'src/app/modelo/usuario-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {

  producto: ProductoDTO;
  productos: ProductoGetDTO[];
  seleccionados: ProductoGetDTO[];
  textoBtnEliminar: string;
  idUsuario:number;
  codigoProducto: number = 0;
  usuario: UsuarioDTO;


  constructor(private route: ActivatedRoute,private productoServicio: ProductoService,private router:Router
    ,private usuarioService:UsuarioService,private tokenService:TokenService) {
    this.productos = [];
    this.seleccionados = [];
    this.textoBtnEliminar = "";
    this.usuario = new UsuarioDTO;
    this.idUsuario = tokenService.getCodigoUsuario();
    this.producto = new ProductoDTO(); 
    console.log("Usuario: " + this.idUsuario);
    //this.idUsuario = this.productoServicio.obtenerUsuarioGmail();
    
    
    this.productoServicio.listarMisProductos(this.idUsuario).subscribe({
      next: data => {

        this.productos = data.respuesta;
        console.log("pro: " + this.productos);
      },
      error: err => {
        console.log(err.error);
      }

    });
    

  }

  ngOnInit(): void {
    
  }

  public seleccionar(producto: ProductoGetDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(producto);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i != producto);
      
      
    }
    this.actualizarMensaje();
  }
  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = "1 producto a Eliminado ";
      } else {
        this.textoBtnEliminar = tam + " productoS a Eliminado ";
      }
    } else {
      this.textoBtnEliminar = "";
    }
  }

  public borrarProductos(){

    this.seleccionados.forEach(e => {
    this.productos = this.productos.filter(i => i != e);

    //this.productos.length;
   
    //this.productoServicio.eliminar(14).subscribe();
    //this.productoServicio.eliminar(this.seleccionados.map( p => p.codigo ) ).subscribe;
    this.router.navigate(['/eliminarProducto/', this.seleccionados.map( p => p.codigo )]);
    console.log("Eliminate: " + this.seleccionados.map( p => p.codigo ) );
    });
    this.seleccionados = [];
    this.actualizarMensaje();
    }


}


