import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private fileApiUrl = 'http://localhost:8080/api/file';
  private textApiUrl = 'http://localhost:8080/api/text';

  constructor(private http: HttpClient) { }

  uploadFiles(files: FileList | File[]): Observable<HttpEvent<any>> {
    const formData = new FormData();

    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    const req = new HttpRequest('POST', this.fileApiUrl + "/upload", formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  uploadPlainTextTicket(ticketText: FormGroup){

    console.log(ticketText)
    const obj = ticketText.getRawValue();
    console.log("obj")
    console.log(obj)
    // const json = JSON.parse(obj);

    const req = new HttpRequest('POST', this.textApiUrl + "/upload", obj, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

}
