import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputGroupComponent } from './form-input-group.component';

describe('FormInputGroupComponent', () => {
  let component: FormInputGroupComponent;
  let fixture: ComponentFixture<FormInputGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
