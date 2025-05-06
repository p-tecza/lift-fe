import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private uploadUrl = 'http://localhost:8080/api/test/upload';

  constructor(private http: HttpClient) { }

  uploadFiles(files: FileList | File[]): Observable<HttpEvent<any>> {
    const formData = new FormData();

    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    const req = new HttpRequest('POST', this.uploadUrl, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    console.log("upload?");
    return this.http.request(req);
  }

}
