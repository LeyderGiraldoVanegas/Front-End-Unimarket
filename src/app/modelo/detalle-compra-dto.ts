import { ProductoDTO } from "./producto-dto";

export class DetalleCompraDTO {
   
    codigoProducto: number = 0;
    producto: ProductoDTO = new ProductoDTO();
    unidades: number = 0;
    valorTotal: number =0;

    constructor( producto: ProductoDTO, unidades: number){
        this.producto = producto;
        this.unidades = unidades;
        this.valorTotal = unidades * producto.precio;
    }
}
