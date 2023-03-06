import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/user-api.service';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss']
})
export class UserManagementPageComponent {

  userList: User[] = [];
  displayedColumns: string[] = ['selected', 'id', 'name', 'mail', 'role'];
  dataSource: MatTableDataSource<User>;

  selectedUser: User = {
    mail: '',
    username: 'Ninguno',
    password: '',
    role: '',
    id: -1,
    updated_at: '',
    created_at: '',
    last_updated_by: '',
  };

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    public globalService: GlobalService,
    private userApi: UserApiService,
    ) {
    this.globalService.pageName.next({
      currentPageName: 'Gestión de usuarios'
    })
    this.dataSource = new MatTableDataSource(this.userList);
    this.userApi.getUsers().subscribe({
      next: (users) => {
        this.userList = users;
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
