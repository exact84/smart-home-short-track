import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDashboardDialog } from './add-dashboard-dialog';

describe('Dialog', () => {
  let component: AddDashboardDialog;
  let fixture: ComponentFixture<AddDashboardDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDashboardDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDashboardDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
