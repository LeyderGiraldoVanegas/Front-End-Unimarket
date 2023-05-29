import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {


  productos:ProductoGetDTO[] = [];

  constructor(private productoServicio:ProductoService,private router:Router){
    this.productoServicio.listarProductos().subscribe({
      next: data =>{
        this.productos = data.respuesta;
      },
      error: err =>{
        console.log(err.error)
      }
    })
  }

  public iraBusqueda(categoria: string) {
    if (categoria) {
      this.router.navigate(['/busquedaCategoria', categoria]);
    }
  }
}
