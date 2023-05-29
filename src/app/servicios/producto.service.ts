import { Injectable } from '@angular/core';
import { ProductoGetDTO } from '../modelo/producto-get-dto';
import { ProductoDTO } from '../modelo/producto-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  

  private authURL = "http://localhost:8091/api/producto";
  productos: ProductoGetDTO[];

  constructor(private http:HttpClient) {
    this.productos = [];

    /*this.productos.push(new ProductoGetDTO(1, "Televisor LG 4K", "Descripcion 1", 3500000, 4,
    ["https://picsum.photos/450/225", "https://picsum.photos/450/225"], ["TECNOLOGIA"]));
    
    this.productos.push(new ProductoGetDTO(2, "Tenis Nike", "Descripcion 2", 650000, 4,
    ["https://picsum.photos/450/225"], ["ROPA", "DEPORTE"]));

    this.productos.push(new ProductoGetDTO(3, "Fifa", "Descripcion 3", 3500000, 5,
    ["https://picsum.photos/450/225", "https://picsum.photos/450/225"], ["MASCOTAS"]));
    
    this.productos.push(new ProductoGetDTO(4, "Nin 64", "Descripcion 4", 650000, 7,
    ["https://picsum.photos/450/225"], ["DEPORTE"]));

    this.productos.push(new ProductoGetDTO(5, "Tennis ", "Descripcion 5", 50000, 7,
    ["https://picsum.photos/450/225"], ["MODA"]));

    this.productos.push(new ProductoGetDTO(6, "Nike", "Descripcion 6", 179000, 2,
    ["https://picsum.photos/450/225"], ["RPOA"]));
    //CREE OTROS PRODUCTOS (AL MENOS 6 MÁS)*/
    

  }
  public listar(): ProductoGetDTO[] {
    return this.productos;
  }

  public obtener(codigo:number):ProductoGetDTO | undefined{
    return this.productos.find(p => p.codigo == codigo);
    //return this.http.put<MensajeDTO>(`${this.authURL}/obtenerProducto`, codigo);
  }
//return this.http.get<MensajeDTO>(`${this.authURL}/obtenerProducto/${codigo}`);

  public obtenerProducto( codigo: number) {
    return this.http.get<MensajeDTO>(`${this.authURL}/obtenerProducto/${codigo}`);
  }

  public crear(producto: ProductoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/crear`, producto);
  }

  public actualizar(codigoProducto: number, producto: ProductoDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/actualizarProductos/${codigoProducto}`, producto);
  }

  public eliminar(codigoProducto: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.authURL}/eliminarProducto/${codigoProducto}`);
  }



  

  public listarCategoria(categoria:number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/listar/categoria/${categoria}`);
  }

  //public listarPrecio({min}-{max}: ): Observable<MensajeDTO> {
    //return this.http.get<MensajeDTO>(`${this.authURL}/${{min}-{max}}`);
  //}

  public listarFavorito(idUsuario: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/listar/favorito/${idUsuario}`);
  }

  //public addProductoFavorito(idUsuario: number ,idProducto: number): Observable<MensajeDTO> {
    //return this.http.put<MensajeDTO>(`${this.authURL}/listar/favorito/{idUsuario}/{idProducto}`);
  //}

  public listarProductos( ): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/listar/productos`);
  }
  public listarProductosTodos( ): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/listar/productosTodos`);
  }

  public listarProductosEstado(estado: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/listar/productos/${estado}`);
  }

  public listarBuscarProcudo(nombre: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/listar/buscarProcudo/${nombre}`);
  }

  public listarProductoCaroBarato(categoria: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/listar/categoria/${categoria}`);
  }

  public listarObtenerCantidadCategorias( ): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/listar/obtenerCantidadCategorias`);
  }

  ///listar/MisProductos/{idUsuario}
  public listarMisProductos(idUsuario:number ): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/listar/MisProductos/${idUsuario}`);
  }
}
