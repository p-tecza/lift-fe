import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {MatIcon} from "@angular/material/icon";
import {MatProgressBar} from "@angular/material/progress-bar";
import {finalize, Subscription} from "rxjs";
import {MatMiniFabButton} from "@angular/material/button";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [
    MatIcon,
    MatProgressBar,
    MatMiniFabButton,
    NgIf
  ],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent {


  @Input()
  requiredFileType:string[] | undefined;

  fileName = '';
  uploadProgress:number | undefined = undefined;
  uploadSub: Subscription | undefined = undefined;

  constructor() {} //private http: HttpClient

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      this.uploadProgress = 1;
      // const upload$ = this.http.post("/api/thumbnail-upload", formData, {
      //   reportProgress: true,
      //   observe: 'events'
      // })
      //   .pipe(
      //     finalize(() => this.reset())
      //   );

      // this.uploadSub = upload$.subscribe(event => {
      //   if (event.type == HttpEventType.UploadProgress && event.total) {
      //     this.uploadProgress = Math.round(100 * (event.loaded / event.total));
      //   }
      // })
    }
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

}
