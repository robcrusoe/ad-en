import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-restricted-page',
  templateUrl: './restricted-page.component.html',
  styleUrls: ['./restricted-page.component.css']
})
export class RestrictedPageComponent {

  constructor(private msalService: MsalService) { }

  getUserName(): string {
    return this.msalService.instance.getActiveAccount().name.split(', ').join(' ');
  }

}
