import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {TicketModel} from "../../model/ticket.model";
import {UploadService} from "../../services/upload.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {TicketViewComponent} from "./ticket-view/ticket-view.component";
import {TicketContentModel} from "../../model/ticket-content.model";

@Component({
  selector: 'app-analyze-panel',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    DatePipe,
    MatCellDef,
    MatHeaderCellDef,
    MatButton,
    MatInput,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatRowDef,
    MatHeaderRowDef,
    MatLabel,
    MatTableModule
  ],
  templateUrl: './analyze-panel.component.html',
  styleUrl: './analyze-panel.component.scss'
})
export class AnalyzePanelComponent implements OnInit {

  constructor(private uploadService: UploadService,
              private dialog: MatDialog) {
  }

  displayedColumns: string[] = ['id', 'subject', 'result', 'problem', 'change', 'request', 'date'];
  dataSource = new MatTableDataSource<TicketModel>();

  // Paginacja
  pageSizeOptions = [5, 10];
  pageSize = 5;
  currentPage = 0;
  totalItems = 0;

  // Filtry
  startDate: string | null = null;
  endDate: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    let data: TicketModel[] | null = [];

    if (!this.startDate) {
      console.log("E?")
      const defaultPastDate = new Date();
      defaultPastDate.setDate(defaultPastDate.getDate() - 30);
      this.startDate = this.formatReverseMyDate(defaultPastDate);
    }

    if (!this.endDate) {
      this.endDate = this.formatReverseMyDate(new Date());
    }

    this.uploadService.fetchDataByDates(
      this.formatMyDate(this.startDate),
      this.formatMyDate(this.endDate)
    ).subscribe({
      next: (event: HttpEvent<TicketModel[]>) => {
        if (event.type === HttpEventType.Response) {
          data = event.body;
          if (!data) return;
          this.totalItems = data.length;
          const startIndex = this.currentPage * this.pageSize;
          this.dataSource.data = data.slice(startIndex, startIndex + this.pageSize);
          console.log(data);
        }
      },
      error: (err) => {
        console.error('Błąd podczas pobierania danych:', err);
      }
    });

  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  applyDateFilter() {
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadData();
  }

  clearFilters() {
    this.startDate = null;
    this.endDate = null;
    this.applyDateFilter();
  }

  private formatMyDate(dateString: string): Date {

    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }

  private formatReverseMyDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  sliceString(toSlice: string, maxL:number){
    if(toSlice.length > maxL){
      return toSlice.slice(0, maxL) + "...";
    }
    return toSlice
  }

  openModal(ticketId: string): void {

    this.uploadService.fetchTicketContent(ticketId).subscribe({
      next: (event: HttpEvent<TicketContentModel>) => {
        if (event.type === HttpEventType.Response) {
          const res = event.body;

          console.log("RES DETAILS")
          console.log(res)

          const dialogRef = this.dialog.open(TicketViewComponent, {
            width: '40%'
          });
          dialogRef.componentInstance.ticketContent = res;
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              console.log('Użytkownik potwierdził');
            }
          });
        }
      },
      error: (err) => {
        console.error('Błąd podczas pobierania danych:', err);
      }
    });


  }

}
