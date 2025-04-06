import { Component } from '@angular/core';
import {FileUploaderComponent} from "./file-uploader/file-uploader.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {Tile} from "../components/landing-page/landing-page.component";

@Component({
  selector: 'app-upload-doc',
  standalone: true,
  imports: [
    FileUploaderComponent,
    MatGridList,
    MatGridTile
  ],
  templateUrl: './upload-doc.component.html',
  styleUrl: './upload-doc.component.scss'
})
export class UploadDocComponent {

  tiles: Tile[] = [
    {text: 'One', cols: 4, rows: 2, color: 'lightblue'},
    {text: 'Two', cols: 2, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 2, rows: 1, color: 'yellow'},
    {text: 'Four', cols: 4, rows: 4, color: 'green'}
  ];

}
