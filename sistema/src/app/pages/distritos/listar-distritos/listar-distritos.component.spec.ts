import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDistritosComponent } from './listar-distritos.component';

describe('ListarDistritosComponent', () => {
  let component: ListarDistritosComponent;
  let fixture: ComponentFixture<ListarDistritosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarDistritosComponent]
    });
    fixture = TestBed.createComponent(ListarDistritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
