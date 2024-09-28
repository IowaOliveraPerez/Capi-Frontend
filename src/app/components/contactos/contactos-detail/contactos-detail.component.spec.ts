import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosDetailComponent } from './contactos-detail.component';

describe('ContactosDetailComponent', () => {
  let component: ContactosDetailComponent;
  let fixture: ComponentFixture<ContactosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactosDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
