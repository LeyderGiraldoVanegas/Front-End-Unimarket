import { Component, OnInit } from '@angular/core';
import { DetalleCompraDTO } from 'src/app/modelo/detalle-compra-dto';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ProductoService } from 'src/app/servicios/producto.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  productos: DetalleCompraDTO[];
  valorTotal: number;
  seleccionados: DetalleCompraDTO[];
  textoBtnEliminar: string;
  producto: ProductoDTO ;

  
  constructor(private carritoService: CarritoService, private productoService: ProductoService) {
    this.productos = [];
    this.seleccionados = [];
    this.textoBtnEliminar = "";
    this.valorTotal = 0;
    this.producto = new ProductoDTO;

    
    const listaCodigos = this.carritoService.listar();
    console.log(listaCodigos);
    if (listaCodigos.length > 0) {
      for (let cod of listaCodigos) {
        /** 
        const producto = this.productoService.obtener(cod);
        //this.productoService.listar();
        //console.log("Entra:" + cod);
        if (producto != null) {
          this.productos.push(new DetalleCompraDTO(producto, 1));
          this.valorTotal += producto.precio;
        }*/
        const objetoProducto = this.productoService.obtenerProducto(cod);
        if (objetoProducto != null) {
          //this.producto = objetoProducto;
          this.productoService.listar();
          this.productoService.obtenerProducto(cod).subscribe({
            next: data =>{
              this.producto = data.respuesta;
              this.productos.push(new DetalleCompraDTO(this.producto, 1));
              this.valorTotal += this.producto.precio;
              this.actualizarMensaje();
            },
            error: err =>{
              console.log(err.error)
            }
          })
  
  
        }
      }
    }
  }
  ngOnInit(): void {
    
  }

  public calcularValor(detalleCompra: any) {
    detalleCompra.valorTotal = detalleCompra.producto.precio * detalleCompra.unidades;

    let total = 0;
    for (let detalle of this.productos) {
      total += detalle.valorTotal;
    }
    this.valorTotal = total;
  }

  public seleccionar(detalleCompra: DetalleCompraDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(detalleCompra);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i != detalleCompra);
    }
    this.actualizarMensaje();
  }
  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = "1 elemento";
      } else {
        this.textoBtnEliminar = tam + " elementos";
      }
    } else {
      this.textoBtnEliminar = "";
    }
  }
  public hacerCompra(){
    alert("Compra realizada");
  }
  public borrarProductos(){
    this.seleccionados.forEach(e => {
    this.productos = this.productos.filter(i => i != e);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
    }
   
}
