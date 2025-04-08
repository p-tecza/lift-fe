import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {MatIcon} from "@angular/material/icon";
import {MatProgressBar} from "@angular/material/progress-bar";
import {finalize, Subscription} from "rxjs";
import {MatMiniFabButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [
    MatIcon,
    MatProgressBar,
    MatMiniFabButton,
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent {


  @Input()
  requiredFileType:string[] | undefined;

  fileNames:string[] = ["TEST.png","ROZWALAJACY_CSS_TEST_EOOEOEOEOE.pdf","ea23.jpg","ROZWALAJACY_CSS_TEST_EOOEOEOEOE.pdf","ea23.jpg"
    ,"ROZWALAJACY_CSS_TEST_EOOEOEOEOE.pdf","ea23.jpg","ROZWALAJACY_CSS_TEST_EOOEOEOEOE.pdf","ea23.jpg","ROZWALAJACY_CSS_TEST_EOOEOEOEOE.pdf","ea23.jpg"];
  files: File[] = [];
  uploadProgress:number | undefined = undefined;
  uploadSub: Subscription | undefined = undefined;

  constructor() {} //private http: HttpClient

  onFileSelected(event: any) {
    const files:FileList = event.target.files;
    this.fileNames = [];
    console.log("ee");
    console.log(files)
    Array.from(files).forEach((file) => {
      if (file) {
        this.fileNames.push(file.name);
        this.files.push(file);
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
        console.log(this.fileNames);
      }
    })
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
