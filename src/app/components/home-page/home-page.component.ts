import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private msalService: MsalService
  ) { }

  ngOnInit(): void {
    /* Declaring the redirect handler */
    this.msalService.instance.handleRedirectPromise().then(result => {
      if (result && result.account) {
        console.log('login successful: ', result);
        this.msalService.instance.setActiveAccount(result.account);
      }
    }).catch(error => {
      console.log('login error: ', error);
    });
  }

  login(): void {
    this.msalService.loginRedirect();
  }

  logout(): void {
    this.msalService.logout();
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() !== null;
  }

}
