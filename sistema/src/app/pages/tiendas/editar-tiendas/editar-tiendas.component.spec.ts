import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTiendasComponent } from './editar-tiendas.component';

describe('EditarTiendasComponent', () => {
  let component: EditarTiendasComponent;
  let fixture: ComponentFixture<EditarTiendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarTiendasComponent]
    });
    fixture = TestBed.createComponent(EditarTiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
