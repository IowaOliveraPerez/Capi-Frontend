import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactoService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-contactos-edit',
  templateUrl: './contactos-edit.component.html',
  styleUrls: ['./contactos-edit.component.scss']
})
export class ContactosEditComponent {
  contactForm: FormGroup;
  contactId!: number;

  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      notas: ['', Validators.required],
      pagina_web: ['', Validators.required],
      empresa: [''],
      fecha_cumpleanios: [''],
      telefonos: this.fb.array([]),
      emails: this.fb.array([]),
      direcciones: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.contactId = +this.route.snapshot.paramMap.get('id')!;
    this.contactoService.getContactById(this.contactId).subscribe(response => {
      let contact = response.data;

      this.contactForm.patchValue({
        nombre: contact.nombre,
        notas: contact.notas,
        pagina_web: contact.pagina_web,
        empresa: contact.empresa,
        fecha_cumpleanios: contact.fecha_cumpleanios
      });

      this.setFormArray(contact.telefonos, 'telefonos');
      this.setFormArray(contact.emails, 'emails');
      this.setFormArray(contact.direcciones, 'direcciones');
    });
  }

  setFormArray(data: any[], controlName: string) {
    const formArray = this.contactForm.get(controlName) as FormArray;
    data.forEach(item => {
      formArray.push(this.fb.group(item));
    });
  }

  getFormArray(control: any) {
    return control as FormArray;
  }

  addTelefono() {
    const telefonos = this.contactForm.get('telefonos') as FormArray;
    telefonos.push(this.fb.group({
      numero: ['', Validators.required]
    }));
  }

  removeTelefono(index: number) {
    const telefonos = this.contactForm.get('telefonos') as FormArray;
    telefonos.removeAt(index);
  }

  addEmail() {
    const emails = this.contactForm.get('emails') as FormArray;
    emails.push(this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    }));
  }

  removeEmail(index: number) {
    const emails = this.contactForm.get('emails') as FormArray;
    emails.removeAt(index);
  }

  addDireccion() {
    const direcciones = this.contactForm.get('direcciones') as FormArray;
    direcciones.push(this.fb.group({
      direccion: ['', Validators.required]
    }));
  }

  removeDireccion(index: number) {
    const direcciones = this.contactForm.get('direcciones') as FormArray;
    direcciones.removeAt(index);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactoService.updateContact(this.contactId, this.contactForm.value).subscribe(response => {
        this.snackBar.open('Contacto modificado exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
        // this.router.navigate(['/contactos']);
      });
    }
  }
}
