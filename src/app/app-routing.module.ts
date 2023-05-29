import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { CrearProductoComponent } from './pagina/crear-producto/crear-producto.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { GestionProductosComponent } from './pagina/gestion-productos/gestion-productos.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';
import { DetalleProductoComponent } from './pagina/detalle-producto/detalle-producto.component';
import { RevisarProductosComponent } from './pagina/revisar-productos/revisar-productos.component';
import { ForgotPasswordComponent } from './pagina/forgot-password/forgot-password.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
import { EliminarProductoComponent } from './pagina/eliminar-producto/eliminar-producto.component';
import { AprobarProductoComponent } from './pagina/aprobar-producto/aprobar-producto.component';
import { RechazarProductoComponent } from './pagina/rechazar-producto/rechazar-producto.component';
import { RecuperarContrasenaComponent } from './pagina/recuperar-contrasena/recuperar-contrasena.component';
import { MyPerfilComponent } from './pagina/my-perfil/my-perfil.component';
import { ActualizarProductoComponent } from './pagina/actualizar-producto/actualizar-producto.component';



const routes: Routes = [
{ path: "", component: InicioComponent },
{ path:  "recuperar-contrasena", component: RecuperarContrasenaComponent },
{ path: "login", component: LoginComponent, canActivate: [LoginGuard] },
{ path: "registro", component: RegistroComponent, canActivate: [LoginGuard] },
{ path: "forgot-password/:correo", component: ForgotPasswordComponent},
{ path: "crear-producto", component: CrearProductoComponent, canActivate: [RolesGuard], data: {
    expectedRole: ["CLIENTE"] } },
{ path: "busqueda/:texto", component: BusquedaComponent },
{ path: "busquedaCategoria/:categoria", component: BusquedaComponent },
{ path: "eliminarProducto/:codigo", component: EliminarProductoComponent },
{ path: "editar-producto/:codigo", component: ActualizarProductoComponent, canActivate:[RolesGuard], data: { expectedRole: ["CLIENTE"] } },
{ path: "gestion-productos", component: GestionProductosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
{ path: "detalle-producto/:codigo", component: DetalleProductoComponent,canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
{ path: "carrito", component: CarritoComponent },
{ path: "my-perfil/:codigo", component: MyPerfilComponent },
{ path: "revisar-productos", component: RevisarProductosComponent, canActivate: [RolesGuard], data: { expectedRole: ["MODERADOR"] } },
// { path: "revisar-productos/:estado", component: RevisarProductosComponent, canActivate: [RolesGuard], data: { expectedRole: ["MODERADOR"] } }, 
{ path: "revisar-productos/aprobar/:codigoProducto", component: AprobarProductoComponent, canActivate: [RolesGuard], data: { expectedRole: ["MODERADOR"] } },
{ path: "revisar-productos/rechazar/:codigoProducto", component: RechazarProductoComponent, canActivate: [RolesGuard], data: { expectedRole: ["MODERADOR"] } },


{ path: "**", pathMatch: "full", redirectTo: "" }
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }