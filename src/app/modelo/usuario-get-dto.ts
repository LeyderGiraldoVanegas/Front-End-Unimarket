export class UsuarioGetDTO {

    codigo: number = 0;
    nombre: string = "";
    email: string = "";
    direccion: string = "";
    telefono: string = "";
    password:string = "";
    confirmaPassword:string = "";
    estado:string = "";

    constructor(codigo: number, nombre: string, email: string, direccion: string,
        telefono: string) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.email = email;
        this.direccion = direccion;
        this.telefono = telefono;
        

       
    }

}