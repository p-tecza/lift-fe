import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

  subpages: string[] = ["dashboard", "upload", "analyze", "account"];
  active: string = "dashboard";

  switchScope(newActive: string){
    if(this.subpages.includes(newActive)){
      this.active = newActive;
    }
  }

}
