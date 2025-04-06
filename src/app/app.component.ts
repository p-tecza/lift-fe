import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {SideNavComponent} from "./lift/components/side-nav/side-nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
