import { Data } from "@angular/router";
import { ProductoService } from "../servicios/producto.service";

export class ComentarioGetDTO {


    fechaCreacion: Data | undefined ;
    mensaje: string = "";
    productoComentario:number = 0;
    usuarioComentario:number = 0;


    constructor(fechaCreacion: Data,mensaje: string,productoComentario:number,usuarioComentario:number){
        this.fechaCreacion = fechaCreacion;
        this.mensaje = mensaje;
        this.productoComentario = productoComentario;
        this.usuarioComentario = usuarioComentario;
        
    }
}
