import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosIndexComponent } from './contactos-index.component';

describe('ContactosIndexComponent', () => {
  let component: ContactosIndexComponent;
  let fixture: ComponentFixture<ContactosIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactosIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
