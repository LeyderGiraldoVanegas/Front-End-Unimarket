import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto.service';
//D:\Universidad\Octavo Semestre\Programacion Avanzada\Proyecto Final\my-app
import { ProductoGetDTO } from 'D:/Universidad/Octavo Semestre/Programacion Avanzada/Proyecto Final/my-app/src/app/modelo/producto-get-dto';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  textoBusqueda: string;
  categoria: string;
  productos: ProductoGetDTO[] = [];
  filtro: ProductoGetDTO[] = [];


  constructor(private route: ActivatedRoute, private productoServicio: ProductoService) {
    this.textoBusqueda = "";
    this.categoria = "";
    this.filtro = [];


     this.productoServicio.listarProductos().subscribe({
      next: data => {

        this.productos = data.respuesta;
        console.log("pro: " + this.productos);

        this.route.params.subscribe(params => {
     
           if (params['texto'] !== undefined) {
             this.textoBusqueda = params["texto"];
             this.filtro = this.productos.filter(p =>
               p.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()));
     
             console.log("nombre" + this.productos);
           } else if (params['categoria'] !== undefined) {
            //console.log("categoria" + this.productos.map(p => p.categoria));
            console.log("categoria" + this.productos.map( p => p.categoriaList ));
             this.categoria = params["categoria"];
             this.filtro = this.productos.filter(p =>
               p.categoriaList.includes(this.categoria));
     
             
           }
     
         });
      },
      error: err => {
        console.log(err.error);
      }
    })



    


  }
}