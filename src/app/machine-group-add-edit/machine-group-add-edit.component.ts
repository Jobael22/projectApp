import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MachineGroupService } from '../services/machine-group.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-machine-group-add-edit',
  templateUrl: './machine-group-add-edit.component.html',
  styleUrl: './machine-group-add-edit.component.scss',
})
export class MachineGroupAddEditComponent implements OnInit {
  machineGroupForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _machinegroupService: MachineGroupService,
    private _dialogRef: MatDialogRef<MachineGroupAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.machineGroupForm = this._fb.group({
      hall_id: '',
      custom_id: '',
      name: '',
      lead_time_days: '',
      auto_assign_machine: '',
    });
  }

  ngOnInit(): void {
    this.machineGroupForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.machineGroupForm.valid) {
      if (this.data) {
        this._machinegroupService
          .updateUser(this.data.id, this.machineGroupForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Users Updated Successfully');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      } else {
        this._machinegroupService
          .addUser(this.machineGroupForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Users Added Successfully');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      }
    }
  }
}
