import { Routes } from '@angular/router';
import {LandingPageComponent} from "./lift/landing-page/landing-page.component";
import {UploadDocComponent} from "./lift/upload-doc/upload-doc.component";

export const routes: Routes = [
  {path: 'dashboard', component: LandingPageComponent},
  {path: 'upload', component: UploadDocComponent}
];
