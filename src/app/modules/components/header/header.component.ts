import { LoginService } from 'src/app/core/services/login.service';
import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewChecked{
  constructor(private loginService : LoginService) { }
  public user : String = '';


  ngAfterViewChecked(): void {
     this.loginService.currentUserValue.subscribe(
      user => this.user = user
     );
    }


  logout()
  {
        this.loginService.logout()
        this.user = ''

  }
}
