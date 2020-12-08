import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from '../component/product-list/product-list.component';
import { ProductFormComponent } from '../component/product-form/product-form.component';
import { ProductOrganizerRoute } from './product-organizer-route.enum';

const routes = [
  {
    path: `${ProductOrganizerRoute.LIST}`,
    component: ProductListComponent,
  },
  {
    path: `${ProductOrganizerRoute.CREATE}`,
    component: ProductFormComponent,
  },
  {
    path: `${ProductOrganizerRoute.EDIT}/:id`,
    component: ProductFormComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
] as Routes;

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
