import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosEditComponent } from './contactos-edit.component';

describe('ContactosEditComponent', () => {
  let component: ContactosEditComponent;
  let fixture: ComponentFixture<ContactosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactosEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
