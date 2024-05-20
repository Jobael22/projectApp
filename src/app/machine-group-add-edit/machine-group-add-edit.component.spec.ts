import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineGroupAddEditComponent } from './machine-group-add-edit.component';

describe('MachineGroupAddEditComponent', () => {
  let component: MachineGroupAddEditComponent;
  let fixture: ComponentFixture<MachineGroupAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MachineGroupAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MachineGroupAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
