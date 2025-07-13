import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Subscription} from "rxjs";
import {UploadService} from "../../../services/upload.service";


@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent {


  @Input()
  requiredFileType:string[] | undefined;

  fileNames:string[] = [];
  files: File[] = [];
  uploadProgress:number | undefined = undefined;
  uploadSub: Subscription | undefined = undefined;

  constructor(private fileUploadService: UploadService) {} //private http: HttpClient

  onFileSelected(event: any) {
    const files:FileList = event.target.files;
    this.fileNames = [];
    Array.from(files).forEach((file) => {
      if (file) {
        this.fileNames.push(file.name);
        this.files.push(file);
      }
    })
  }

  upload(){
    this.uploadProgress = 1;
    this.fileUploadService.uploadFiles(this.files).subscribe(
      (res) => {
        console.log(res);
        this.fileNames = [];
        this.files = [];
      }
    );
  }

  cancelUpload() {
    if (!this.uploadSub) return;
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = undefined;
    this.uploadSub = undefined;
  }

  clearFiles(){
    this.fileNames = [];
    this.files = [];
  }

}
