import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ComentarioDTO } from 'src/app/modelo/comentario-dto';
import { ComentarioGetDTO } from 'src/app/modelo/comentario-get-dto';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { SesionDTO } from 'src/app/modelo/sesion-dto';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { UsuarioGetDTO } from 'src/app/modelo/usuario-get-dto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ComentarioService } from 'src/app/servicios/comentario.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  codigoProducto: number = 0;
  producto: ProductoDTO; 
  productos: ProductoGetDTO[] = [];

  comentario: ComentarioDTO;
  comentarios: ComentarioGetDTO[] = [];
  alerta: Alerta | undefined;

  usuarios : UsuarioGetDTO [] = [];
  usuario:UsuarioDTO;

  
  sesion: SesionDTO;
  

  constructor(private carritoService: CarritoService, private route: ActivatedRoute,
    private productoServicio: ProductoService, private router: Router,private tockenServicio: TokenService,
    private comentarioService: ComentarioService) {
    this.producto = new ProductoDTO;
    this.comentario = new ComentarioDTO;

    this.sesion = new SesionDTO();
    this.usuario = new UsuarioDTO();



    this.route.params.subscribe(params => {
      this.codigoProducto = params["codigo"];
      const objetoProducto = this.productoServicio.obtenerProducto(this.codigoProducto);
      //console.log(" : " + (objetoProducto));
      if (objetoProducto != null) {
        //this.producto = objetoProducto;
        this.productoServicio.obtenerProducto(this.codigoProducto).subscribe({
          next: data => {
            this.producto = data.respuesta;
            this.actualizar();
          },
          error: err => {
            console.log(err.error)
          }
        })


      }
    });





  }

  public agregarCarrito() {

    this.carritoService.agregar(this.codigoProducto);
    alert("Se a añadido al carro");
    //swal("Título de la ventana emergente", "Contenido de la ventana emergente", "info");


  }

  ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    this.codigoProducto = codigo ? parseInt(codigo) : 0;
  }

  quitarCarrito(): void {
    this.carritoService.quitar(this.codigoProducto);
  }
  obtenerNombre() {
    return this.producto.nombre;
  }

  public agregarComentario() {
    this.comentario.codigoProducto = this.codigoProducto;
    this.comentario.codigoUsuario = this.tockenServicio.getCodigoUsuario();

    console.log(this.comentario);

    this.comentarioService.agregarComentario(this.comentario).subscribe({
      next: data => {
        console.log("Respuesta: "+data.respuesta);
        alert("Comentario Realizado");
        console.log(this.comentario.menasaje);
        this.actualizar();
      },
      error: error => {
        console.log(error.error);
      }
    
    });;
    
  }

  actualizar() {
    this.comentarioService.ListarComentarios(this.codigoProducto).subscribe({
      next: data => {
        console.log("comentario: " + this.comentario)
        //console.log("Link: "+this.producto.imagenes)
        this.comentarios = data.respuesta;
      },
      error: err => {
        console.log(err.error)
      }
    });
  }

}
