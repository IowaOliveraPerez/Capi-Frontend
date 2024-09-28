import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContactoService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-contactos-create',
  templateUrl: './contactos-create.component.html',
  styleUrls: ['./contactos-create.component.scss']
})
export class ContactosCreateComponent {

  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      empresa: [''],
      pagina_web: [''],
      notas: [''],
      fecha_cumpleanios: [''],
      telefonos: this.fb.array([]),
      emails: this.fb.array([]),
      direcciones: this.fb.array([])
    });
  }

  addTelefono() {
    const telefonos = this.contactForm.get('telefonos') as FormArray;
    telefonos.push(this.fb.group({
      numero: ['', Validators.required]
    }));
  }

  addEmail() {
    const emails = this.contactForm.get('emails') as FormArray;
    emails.push(this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    }));
  }

  addDireccion() {
    const direcciones = this.contactForm.get('direcciones') as FormArray;
    direcciones.push(this.fb.group({
      direccion: ['', Validators.required]
    }));
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.createContact(this.contactForm.value).subscribe({
        next: (response) => {
          this.snackBar.open('Contacto creado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });
          this.router.navigate(['/contactos']);
        },
        error: (error) => {
          console.error('Error al crear contacto', error);
        }
      });
    }
  }

  getFormArray(control: AbstractControl): FormArray {
    return control as FormArray;
  }

  removeTelefono(index: number) {
    this.getFormArray(this.contactForm.get('telefonos')!).removeAt(index);
  }

  removeEmail(index: number) {
    this.getFormArray(this.contactForm.get('emails')!).removeAt(index);
  }

  removeDireccion(index: number) {
    this.getFormArray(this.contactForm.get('direcciones')!).removeAt(index);
  }
}
