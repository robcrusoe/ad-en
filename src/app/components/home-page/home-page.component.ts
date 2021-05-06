import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  profileName: string = 'There';
  profileMail: string = null;

  constructor(
    private msalService: MsalService,
    private http: HttpClient
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

  getProfile() {
    this.http.get('https://graph.microsoft.com/v1.0/me').subscribe((response: any) => {
      console.log('profile success: ', response);
      this.profileName = response.displayName.split(', ').join(' ');
      this.profileMail = response.mail;
    }, (error) => {
      console.log('profile error: ', error);
    })
  }

  getProfileName(): string {
    return this.profileName;
  }

  getProfileMail(): string {
    return this.profileMail;
  }

}
