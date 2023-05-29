import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent {

  producto: ProductoDTO;
  productos: ProductoGetDTO[];
  codigoProducto: number = 0;

  constructor(private productoServicio: ProductoService, private route: ActivatedRoute) {

    this.producto = new ProductoDTO();
    this.productos = [];


    const objeto = this.producto;
    // console.log("entro Eliminado: " );
    //this.productoServicio.eliminar(14).subscribe();
    this.route.params.subscribe(params => {
      this.codigoProducto = params["codigo"];
      // console.log(" : "+ (this.codigoProducto) );
      const objetoProducto = this.productoServicio.obtenerProducto(this.codigoProducto);
      console.log(" : " + (objetoProducto));


      if (objetoProducto != null) {
        //this.producto = objetoProducto;

        this.productoServicio.eliminar(this.codigoProducto).subscribe({
          next: data => {
            this.productos = data.respuesta;
            console.log("Eliminado: " + this.producto.nombre);
          },
          error: err => {
            console.log(err.error);
          }

        });


      }
    });

  }

}
