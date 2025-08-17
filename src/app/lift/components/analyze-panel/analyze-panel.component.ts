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
import {Transaction} from "../../model/transaction.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

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
    CurrencyPipe,
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
export class AnalyzePanelComponent implements OnInit{
  displayedColumns: string[] = ['id', 'title', 'amount', 'date', 'category'];
  dataSource = new MatTableDataSource<Transaction>();

  // Paginacja
  pageSizeOptions = [5];
  pageSize = 5;
  currentPage = 0;
  totalItems = 0;

  // Filtry
  startDate: Date | null = null;
  endDate: Date | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Mock danych - w praktyce dane będą z API
    const mockData: Transaction[] = [
      { id: 1, title: 'Zakupy spożywcze', amount: 150.23, date: new Date('2024-05-15'), category: 'Jedzenie' },
      { id: 2, title: 'Bilet miesięczny', amount: 100, date: new Date('2024-05-10'), category: 'Transport' },
      { id: 3, title: 'Kino', amount: 45, date: new Date('2024-05-18'), category: 'Rozrywka' },
      { id: 4, title: 'Czynsz', amount: 1200, date: new Date('2024-05-01'), category: 'Mieszkanie' },
      { id: 5, title: 'Prezent', amount: 80, date: new Date('2024-04-28'), category: 'Inne' },
      { id: 6, title: 'Laptop', amount: 3200, date: new Date('2024-04-20'), category: 'Elektronika' },
      { id: 7, title: 'Książki', amount: 120, date: new Date('2024-05-22'), category: 'Edukacja' },
      { id: 8, title: 'Restauracja', amount: 90, date: new Date('2024-05-21'), category: 'Jedzenie' },
      { id: 9, title: 'Ubezpieczenie', amount: 220, date: new Date('2024-05-05'), category: 'Finanse' },
      { id: 10, title: 'Siłownia', amount: 70, date: new Date('2024-05-12'), category: 'Zdrowie' },
    ];

    // Filtrowanie po dacie
    let filteredData = mockData;

    if (this.startDate || this.endDate) {
      filteredData = mockData.filter(transaction => {
        const transDate = transaction.date;
        const afterStart = this.startDate ? transDate >= new Date(this.startDate) : true;
        const beforeEnd = this.endDate ? transDate <= new Date(this.endDate) : true;
        return afterStart && beforeEnd;
      });
    }

    // Paginacja
    this.totalItems = filteredData.length;
    const startIndex = this.currentPage * this.pageSize;
    this.dataSource.data = filteredData.slice(startIndex, startIndex + this.pageSize);
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
}
