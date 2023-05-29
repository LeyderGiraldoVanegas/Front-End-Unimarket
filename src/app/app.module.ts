import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { CrearProductoComponent } from './pagina/crear-producto/crear-producto.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { GestionProductosComponent } from './pagina/gestion-productos/gestion-productos.component';
import { DetalleProductoComponent } from './pagina/detalle-producto/detalle-producto.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { RevisarProductosComponent } from './pagina/revisar-productos/revisar-productos.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { ForgotPasswordComponent } from './pagina/forgot-password/forgot-password.component';
import { EliminarProductoComponent } from './pagina/eliminar-producto/eliminar-producto.component';
import { ProductosModeradorComponent } from './pagina/productos-moderador/productos-moderador.component';
import { AprobarProductoComponent } from './pagina/aprobar-producto/aprobar-producto.component';
import { RechazarProductoComponent } from './pagina/rechazar-producto/rechazar-producto.component';
import { RecuperarContrasenaComponent } from './pagina/recuperar-contrasena/recuperar-contrasena.component';
import { MyPerfilComponent } from './pagina/my-perfil/my-perfil.component';
import { ActualizarProductoComponent } from './pagina/actualizar-producto/actualizar-producto.component';
import { ListarUusariosFavortosComponent } from './pagina/listar-uusarios-favortos/listar-uusarios-favortos.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    CrearProductoComponent,
    BusquedaComponent,
    GestionProductosComponent,
    DetalleProductoComponent,
    CarritoComponent,
    AlertaComponent,
    RevisarProductosComponent,
    ForgotPasswordComponent,
    EliminarProductoComponent,
    ProductosModeradorComponent,
    AprobarProductoComponent,
    RechazarProductoComponent,
    RecuperarContrasenaComponent,
    MyPerfilComponent,
    ActualizarProductoComponent,
    ListarUusariosFavortosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
