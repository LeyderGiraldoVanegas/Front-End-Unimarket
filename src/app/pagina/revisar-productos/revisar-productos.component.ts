import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { ModeradorService } from 'src/app/servicios/moderador.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-revisar-productos',
  templateUrl: './revisar-productos.component.html',
  styleUrls: ['./revisar-productos.component.css']
})
export class RevisarProductosComponent {

  producto: ProductoDTO;
  productos: ProductoGetDTO[];
  //idUsuario:number;
  codigoProducto: number = 0;

  seleccionados: ProductoGetDTO[];
  textoBtnEliminar: string;
  textoBusqueda: string;
  filtro: ProductoGetDTO[] = [];

  constructor(private route: ActivatedRoute, private productoServicio: ProductoService, private router: Router
    , private moderadorService: ModeradorService) {

    this.producto = new ProductoDTO();
    this.productos = [];
    this.seleccionados = [];
    this.textoBtnEliminar = "";
    this.textoBusqueda = "";
    this.filtro = [];

    this.productoServicio.listarProductosTodos().subscribe({

      next: data => {
        this.productos = data.respuesta;
        console.log("pro: " + this.productos);
      },
      error: err => {
        console.log(err.error)
      }
    });

    const objeto = this.producto;
    this.route.params.subscribe(params => {
      this.codigoProducto = params["codigoProducto"];
      // console.log(" : "+ (this.codigoProducto) );
      const objetoProducto = this.productoServicio.obtenerProducto(this.codigoProducto);

    });

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

  public borrarProductos() {

    this.seleccionados.forEach(e => {
      this.productos = this.productos.filter(i => i != e);

      //this.productos.length;

      //this.productoServicio.eliminar(14).subscribe();
      //this.productoServicio.eliminar(this.seleccionados.map( p => p.codigo ) ).subscribe;
      // this.router.navigate(['/eliminarProducto/', this.seleccionados.map( p => p.codigo )]);
      // console.log("Eliminate: " + this.seleccionados.map( p => p.codigo ) );
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }


  public iraBusquedaEstado(estado: string) {
    if (estado) {
      this.productoServicio.listarProductosEstado(estado).subscribe({
        next: data => {
          this.productos = data.respuesta;
          //console.log("pro: " + this.productos);
        },
        error: err => {
          console.log(err.error)
        }
      });
    }
  }

}

