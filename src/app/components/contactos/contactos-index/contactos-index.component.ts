import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContactoService } from 'src/app/services/contactos.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-contactos-index',
  templateUrl: './contactos-index.component.html',
  styleUrls: ['./contactos-index.component.scss']
})
export class ContactosIndexComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['nombre', 'empresa', 'fecha_cumpleanios', 'telefonos', 'emails', 'direcciones', 'actions'];
  dataSource = new MatTableDataSource<any>();
  loading = true;
  totalContacts = 0;
  pageSize = 10;
  currentPage = 1;
  filter = '';
  sortColumn: string = 'nombre';
  sortDirection: string = 'asc';
  contacts: any[] = [];

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

  getContacts(page: number = 1, pageSize: number = this.pageSize): void {
    this.loading = true;
    this.contactoService.getContacts(page, pageSize, this.filter, this.sortColumn, this.sortDirection).subscribe((response) => {
      this.dataSource.data = response.data;
      this.totalContacts = response.total;
      this.pageSize = response.per_page;
      this.loading = false;
    }, (error) => {
      console.error('Error al obtener contactos:', error);
      this.loading = false;
    });
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getContacts(this.currentPage, this.pageSize);
  }

  sortChanged(event: Sort): void {
    this.sortColumn = event.active;
    this.sortDirection = this.sortDirection == 'desc' ? 'asc' : 'desc';
    this.getContacts(this.currentPage, this.pageSize);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter = filterValue;
    this.getContacts(this.currentPage, this.pageSize);
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
