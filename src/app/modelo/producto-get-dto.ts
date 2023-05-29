export class ProductoGetDTO {
   
    codigo: number = 0;
    nombre: string = "";
    descripcion: string = "";
    precio: number = 0;
    unidades: number = 0;
    imagenes: string[] = [];
    categoriaList: string[] = [];
    codigoVendedor:number = 0;
    estado:string = "" ;


    constructor(codigo: number,nombre: string,descripcion: string, precio: number,
                unidades: number,imagenes: string[], categoria: string[]){
        this.codigo=codigo;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.precio=precio;
        this.unidades=unidades;
        this.imagenes=imagenes;
        this.categoriaList=categoria;
    }

    //(2, 
    //"Tenis Nike", 
    //"Descripcion 2",
    // 650000, 
    // 4,
    //["https://picsum.photos/450/225"],
    //["ROPA", "DEPORTE"])
}
