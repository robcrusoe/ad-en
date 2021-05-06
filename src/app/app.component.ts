import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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

  getProfile(): void {
    this.http.get('https://graph.microsoft.com/v1.0/me').subscribe((response: any) => {
      console.log('profile success: ', response);
      this.profileName = response.displayName.split(', ').join(' ');
      this.profileMail = response.mail;
    }, (error) => {
      console.log('profile error: ', error);
    });
  }

  getProfileName(): string {
    return this.profileName;
  }

  getProfileMail(): string {
    return this.profileMail;
  }

}
