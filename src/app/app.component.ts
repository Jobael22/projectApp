import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MachineGroupAddEditComponent } from './machine-group-add-edit/machine-group-add-edit.component';
import { MachineGroupService } from './services/machine-group.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'hall_id',
    'custom_id',
    'name',
    'lead_time_days',
    'auto_assign_machine',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _machinegroupService: MachineGroupService
  ) {}

  ngOnInit(): void {
    this.gerUserList();
  }

  openAddEditUserForm() {
    const dialogRef = this._dialog.open(MachineGroupAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.gerUserList();
        }
      },
    });
  }

  gerUserList() {
    this._machinegroupService.getUser().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.value);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: number) {
    this._machinegroupService.deleteUser(id).subscribe({
      next: (res) => {
        alert('User Deleted Successfully');
        this.gerUserList();
      },
      error: console.log,
    });
  }

  openEditUserForm(data: any) {
    const dialogRef = this._dialog.open(MachineGroupAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.gerUserList();
        }
      },
    });
  }
}
