import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductosComponent } from './pages/productos/crear-productos/crear-productos.component';
import { EditarProductosComponent } from './pages/productos/editar-productos/editar-productos.component';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { LoginComponent } from './pages/users/login/login.component';
import { TiendasComponent } from './pages/tiendas/tiendas.component';
import { ListarDistritosComponent } from './pages/distritos/listar-distritos/listar-distritos.component';
import { ListarTiendasComponent } from './pages/tiendas/listar-tiendas/listar-tiendas.component';
import { EditarTiendasComponent } from './pages/tiendas/editar-tiendas/editar-tiendas.component';
import { UploadComponent } from './pages/upload/upload.component';

const routesInicio: Routes = [
  { path: '', component: LoginComponent },
  { path: 'crear-usuario', component: CreateUserComponent },
  { path: 'listar-productos', component: ListarProductosComponent },
  { path: 'crear-productos', component: CrearProductosComponent },
  { path: 'editar-producto/:id', component: EditarProductosComponent },
  { path: 'tiendas', component: TiendasComponent },
  { path: 'listar-distritos', component: ListarDistritosComponent },
  { path: 'listar-tiendas/:id', component: ListarTiendasComponent },
  { path: 'editar-tienda/:id', component: EditarTiendasComponent },
  { path: 'upload', component: UploadComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forRoot(routesInicio)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
