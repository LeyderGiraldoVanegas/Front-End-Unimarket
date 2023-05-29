import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent  implements OnInit{

  categorias: Categoria[] = [
    {label:'Tecnologia',name:'TECNOLOGIA',checked:false},
    {label:'Hogar',name:'HOGAR',checked:false},
    {label:'COCHES',name:'COCHES',checked:false},
    {label:'PINTURA',name:'PINTURA',checked:false},
    {label:'HERRAMIENTAS',name:'HERRAMIENTAS',checked:false},
    //{label:'Deporte',name:'DEPORTE',checked:false},
    //{label:'videojuego',name:'VIDEOJUEGO',checked:false},
  ];


  producto: ProductoDTO;
  //categorias: string[];
  archivos!: FileList;
  esEdicion: boolean = false;
  codigoProducto: number = 0;
  txtboton: string = 'Crear Producto';
  seleccionadas: string[] = [];
  alerta!: Alerta;
  usuario: UsuarioDTO ;


  constructor(private productoService: ProductoService, private route: ActivatedRoute,
    private imagenService: ImagenService, private categoriaService: CategoriaService,
    private tokenService : TokenService) {
    this.producto = new ProductoDTO();
    this.usuario = new UsuarioDTO;
    
    this.subirImagenes();

    this.route.params.subscribe(params => {
      this.codigoProducto = params["codigo"];
      let objetoProducto = this.productoService.obtener(this.codigoProducto);
      if (objetoProducto != null) {
        this.producto = objetoProducto;
        this.esEdicion = true;
        this.txtboton = 'Editar Producto';
      }
    });

    if(this.esEdicion){
      this.cargarCategorias();
    }

  }

  public crearProducto() {

    const objetoA = this;

    if (this.producto.imagenes.length > 0) {
     const codigoVendedor = this.tokenService.getCodigoUsuario();
     console.log(codigoVendedor);
      this.producto.codigoVendedor   = codigoVendedor  ;
      this.productoService.crear(this.producto).subscribe({
        next: data => {
          console.log(data.respuesta);
          objetoA.alerta = new Alerta(data.respuesta, "success");
          objetoA.alerta = new Alerta("Se ha Creado el producto!", "success");
        },
        error: error => {
          console.log(error.error);
        }
      });
    } else {
     // console.log('Debe seleccionar al menos una imagen y subirla');
    }
  }


  private cargarCategorias() {
    console.log(this.producto.categoriaList);
    for (let categoria of this.producto.categoriaList) {
      let index = this.categorias.findIndex(c => c.name === categoria);
      if (index !== -1) {
        this.categorias[index].checked = true;
      }
    }
  }

  public subirImagenes() {
    const objetoA = this;
    if (this.archivos != null && this.archivos.length > 0) {
      const objeto = this.producto;
      const formData = new FormData();

      
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          objeto.imagenes.push(data.respuesta.url);
          objetoA.alerta = new Alerta(data.respuesta, "success");
          objetoA.alerta = new Alerta("Se ha subido la imagen correctamente!", "success");
          console.log(data.respuesta.url);
          this.producto.imagenes[0]=data.respuesta.url;
        },
        error: error => {
          console.log(error.error);
          objetoA.alerta = new Alerta(error.error.respuesta, "danger");
        }
      });
    } else {
      console.log('Debe seleccionar al menos una imagen y subirla');
    //  objetoA.alerta = new Alerta("Sube una imagen", "danger");
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
    }
  }

  onCheckboxChange(item: string, event: any) {
    this.seleccionadas.push(item);
    console.log(this.seleccionadas);
  }

  onCategoriasChange() {
    const names = this.categorias.filter(categoria => categoria.checked).map(categoria => categoria.name);
    this.producto.categoriaList = names;
    console.log(this.producto.categoriaList);
  }

  ngOnInit(): void {
      
  }

}

interface Categoria {
  label: string;
  name: string;
  checked: boolean;
}
