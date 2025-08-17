import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {TicketModel} from "../model/ticket.model";
import {TicketContentModel} from "../model/ticket-content.model";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private fileApiUrl = 'http://localhost:8080/api/file';
  private textApiUrl = 'http://localhost:8080/api/text';
  private dataApiUrl = 'http://localhost:8080/api/data';

  constructor(private http: HttpClient) {
  }

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

  uploadPlainTextTicket(ticketText: FormGroup) {

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

  fetchDataByDates(from: Date, to: Date): Observable<HttpEvent<TicketModel[]>> {
    const obj = {
      from: from,
      to: to
    };

    console.log(obj)
    const req = new HttpRequest('POST', this.dataApiUrl + "/by-dates", obj, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  fetchTicketContent(ticketId: string): Observable<HttpEvent<TicketContentModel>> {
    const req = new HttpRequest('GET', this.dataApiUrl + "/" + ticketId, {
      responseType: 'json'
    });
    return this.http.request(req);
  }

}
