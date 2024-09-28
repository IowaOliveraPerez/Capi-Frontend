import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

  constructor(private contactoService: ContactoService) { }

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
      console.log(response);
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
}
