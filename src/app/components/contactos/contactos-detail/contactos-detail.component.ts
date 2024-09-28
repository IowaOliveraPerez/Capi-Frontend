import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactoService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-contactos-detail',
  templateUrl: './contactos-detail.component.html',
  styleUrls: ['./contactos-detail.component.scss']
})
export class ContactosDetailComponent {
  contactForm: FormGroup;
  contactId!: number;

  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService,
    private route: ActivatedRoute
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
}
