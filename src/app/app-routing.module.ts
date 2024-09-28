import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactosIndexComponent } from './components/contactos/contactos-index/contactos-index.component';
import { ContactosCreateComponent } from './components/contactos/contactos-create/contactos-create.component';
import { ContactosEditComponent } from './components/contactos/contactos-edit/contactos-edit.component';
import { ContactosDetailComponent } from './components/contactos/contactos-detail/contactos-detail.component';

const routes: Routes = [
  { path: 'contactos', component: ContactosIndexComponent },
  { path: 'contactos/create', component: ContactosCreateComponent },
  { path: 'contactos/:id', component: ContactosDetailComponent },
  { path: 'contactos/:id/edit', component: ContactosEditComponent },
  { path: '**', redirectTo: 'contactos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
