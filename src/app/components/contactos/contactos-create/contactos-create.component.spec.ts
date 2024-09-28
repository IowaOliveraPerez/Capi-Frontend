import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosCreateComponent } from './contactos-create.component';

describe('ContactosCreateComponent', () => {
  let component: ContactosCreateComponent;
  let fixture: ComponentFixture<ContactosCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactosCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
