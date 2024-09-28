import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContactoService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-contactos-index',
  templateUrl: './contactos-index.component.html',
  styleUrls: ['./contactos-index.component.scss']
})
export class ContactosIndexComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contacts: any[] = [];
  displayedColumns: string[] = ['nombre', 'empresa', 'fecha_cumpleanios', 'telefonos', 'emails', 'direcciones', 'actions'];
  dataSource = new MatTableDataSource<any>([this.contacts]);
  loading: boolean = false;

  constructor(
    private contactoService: ContactoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const normalizedFilter = filter.trim().toLowerCase();
      const matchNombre = data.nombre.toLowerCase().includes(normalizedFilter);
      const matchEmpresa = data.empresa.toLowerCase().includes(normalizedFilter);
      const matchFechaCumpleanios = data.fecha_cumpleanios && data.fecha_cumpleanios.toString().toLowerCase().includes(normalizedFilter);
      const matchTelefonos = data.telefonos && data.telefonos.some((telefono: any) =>
        telefono.numero.toLowerCase().includes(normalizedFilter)
      );
      const matchEmails = data.emails && data.emails.some((email: any) =>
        email.email.toLowerCase().includes(normalizedFilter)
      );
      const matchDirecciones = data.direcciones && data.direcciones.some((direccion: any) =>
        direccion.direccion.toLowerCase().includes(normalizedFilter)
      );
      return matchNombre || matchEmpresa || matchFechaCumpleanios || matchTelefonos || matchEmails || matchDirecciones;
    };
    this.getContacts();
  }

  getContacts(): void {
    this.loading = true;
    this.contactoService.getContacts().subscribe((response) => {
      this.dataSource.data = response.data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(contact: any) {
    this.loading = true;
    this.contactoService.deleteContact(contact.id).subscribe({
      next: (response) => {
        this.loading = false;
        this.dataSource.data = this.dataSource.data.filter(c => c.id !== contact.id);
        this.snackBar.open('Contacto eliminado exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error al eliminar contacto', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
      }
    });
  }
}
