import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { ModeradorService } from 'src/app/servicios/moderador.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-aprobar-producto',
  templateUrl: './aprobar-producto.component.html',
  styleUrls: ['./aprobar-producto.component.css']
})
export class AprobarProductoComponent {

  producto: ProductoDTO;
  productos: ProductoGetDTO[];
  codigoProducto: number = 0;

  constructor(private productoServicio: ProductoService, private route: ActivatedRoute,private moderadorService: ModeradorService) {
    this.producto = new ProductoDTO();
    this.productos = [];

    const objeto = this.producto;
    this.route.params.subscribe(params => {
      this.codigoProducto = params["codigoProducto"];
      const objetoProducto = this.productoServicio.obtenerProducto(this.codigoProducto);
      console.log(" : " + (objetoProducto));


      if (objetoProducto != null) {
        //this.producto = objetoProducto;

        this.moderadorService.aprobarProducto(this.codigoProducto).subscribe({
          next: data => {
            this.productos = data.respuesta;
            console.log("aprobarProducto: "+this.producto.nombre );
          },
          error: err => {
            console.log(err.error);
          }
    
        });


      }
    });

  }
}
