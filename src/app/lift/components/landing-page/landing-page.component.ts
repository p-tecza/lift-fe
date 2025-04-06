import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {Tile} from "../../utils/tile";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  tiles: Tile[] = [
    {text: 'One', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 4, rows: 4, color: 'lightgreen'},
  ];
}
