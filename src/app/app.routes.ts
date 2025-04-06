import { Routes } from '@angular/router';
import {LandingPageComponent} from "./lift/components/landing-page/landing-page.component";
import {AnalyzePanelComponent} from "./lift/components/analyze-panel/analyze-panel.component";
import {AccountPanelComponent} from "./lift/components/account-panel/account-panel.component";
import {UploadDocComponent} from "./lift/components/upload-doc/upload-doc.component";

export const routes: Routes = [
  {path: 'dashboard', component: LandingPageComponent},
  {path: 'upload', component: UploadDocComponent},
  {path: 'analyze', component: AnalyzePanelComponent},
  {path: 'account', component: AccountPanelComponent}
];
