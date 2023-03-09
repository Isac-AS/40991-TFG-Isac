import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/user-api.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss']
})
export class UserManagementPageComponent {

  // Table management
  userList: User[] = [];
  displayedColumns: string[] = ['selected', 'id', 'name', 'email', 'role', 'delete'];
  dataSource: MatTableDataSource<User>;

  selectedUser: User = {
    email: '',
    username: 'Ninguno',
    password: '',
    role: '',
    is_admin: false,
    id: -1,
    updated_at: '',
    created_at: '',
    created_by: '',
    last_modified_by: '',
  };

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    public globalService: GlobalService,
    private userApi: UserApiService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
    ) {
    this.globalService.pageName.next({
      currentPageName: 'Gestión de usuarios'
    })
    this.dataSource = new MatTableDataSource(this.userList);
    this.fetchUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchUsers() {
    this.userApi.getUsers().subscribe({
      next: (users) => {
        console.log(users)
        this.userList = users;
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  // User modification
  possibleRoles = [
    {name: 'Personal sanitario', databaseName: '1'},
    {name: 'Científico de datos/Desarrollador', databaseName: '2'},
  ]
  invalidAnswerFromBackend: boolean = false;
  backendMessage: string = ''

  userForm = this.fb.group({
    username: [this.selectedUser.username, Validators.required],
    email: [this.selectedUser.email, [Validators.required, Validators.email]],
    role: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(6)]]
  })

  updateForm() {
    this.userForm.setValue({
      email: this.selectedUser.email,
      username: this.selectedUser.username,
      password: null,
      role: null
    })
    this.userForm.markAsUntouched()
  }

  modify() {
    this.selectedUser.username = this.userForm.value.username!;
    this.selectedUser.password = this.userForm.value.password!;
    this.selectedUser.email = this.userForm.value.email!;
    this.selectedUser.role = this.userForm.value.role!;
    this.userApi
      .modifyUser(this.selectedUser)
      .subscribe({
        next: (res) => {
          if (res.result == true) {
            this._snackBar.open("¡Usuario modificado con éxito!", "Continuar", {duration: 5000});
            this.invalidAnswerFromBackend = false;
            this.userForm.markAsUntouched()
          } else if (res.result == false) {
            this._snackBar.open("Error con la modificación usuario", "Continuar", {duration: 5000});
            this.invalidAnswerFromBackend = true;
            this.backendMessage = res.message;
          }
        }
      })
  }

  // User deletion
  openUserDeletionDialog(user_id: number) {
    const dialogRef = this.dialog.open(UserDeletionDialogContent)
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          this.deleteUser(user_id)
        }
        console.log(result)
      }
    )
  }

  deleteUser(user_id: number) {
    this.userApi.deleteUser(user_id).subscribe(
      (response) => {
        console.log(response)
        this.fetchUsers();
      }
    )
  }
}

@Component({
  selector: 'user-deletion-dialog-content',
  templateUrl: 'delete-user-dialog.html',
  styleUrls: ['./user-management-page.component.scss']
})
export class UserDeletionDialogContent{
  constructor(
    public dialogRef: MatDialogRef<UserDeletionDialogContent>,
  ){}
  onNoClick(): void {
    this.dialogRef.close(false)
  }
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}