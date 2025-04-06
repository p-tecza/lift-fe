import { Component } from '@angular/core';
import {FileUploaderComponent} from "./file-uploader/file-uploader.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {Tile} from "../../utils/tile";
import {TextUploaderComponent} from "./text-uploader/text-uploader.component";

@Component({
  selector: 'app-upload-doc',
  standalone: true,
  imports: [
    FileUploaderComponent,
    MatGridList,
    MatGridTile,
    TextUploaderComponent
  ],
  templateUrl: './upload-doc.component.html',
  styleUrl: './upload-doc.component.scss'
})
export class UploadDocComponent {

  tiles: Tile[] = [
    {text: 'One', cols: 4, rows: 2, color: 'lightblue', id:"header"},
    {text: 'Two', cols: 2, rows: 1, color: 'lightgreen', id:"optionPlain"},
    {text: 'Three', cols: 2, rows: 1, color: 'yellow', id:"optionFile"},
    {text: 'Four', cols: 4, rows: 4, color: 'green', id:"content"}
  ];

  plainTextUploadScope:boolean = true;


  switchScope(scopeTarget:boolean){
    this.plainTextUploadScope = scopeTarget;
  }


}
