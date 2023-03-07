import { Component, OnInit } from '@angular/core';
import { BackendAPIService } from 'src/app/services/backend.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
  styleUrls: ['./testing-page.component.scss']
})
export class TestingPageComponent implements OnInit {

  constructor(
    private backendService: BackendAPIService,
    public globalService: GlobalService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Página de pruebas'
    })
   }

  ngOnInit() {
  }

  ping() {
    this.backendService.ping().subscribe({
      next: (res: any) => {
        console.log(res)
      }
    })

  }

}
