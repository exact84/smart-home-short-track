import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardDialog } from './edit-card-dialog';

describe('EditCardDialog', () => {
  let component: EditCardDialog;
  let fixture: ComponentFixture<EditCardDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCardDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCardDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
