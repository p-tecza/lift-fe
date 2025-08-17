import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../model/transaction.model";
import {NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {TicketModel} from "../../model/ticket.model";
import {range} from "rxjs";
import {UploadService} from "../../services/upload.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    NgChartsModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit{


  constructor(private uploadService: UploadService) {
  }

  tickets: TicketModel[] = [];

// Wykres kołowy
  pieChartData: ChartData<"pie"> = {labels: [], datasets: []};
  pieChartOptions: ChartConfiguration<"pie">['options'] = {
    responsive: true,
    plugins: {
      legend: {position: 'right'}
    }
  };
  pieChartType: "pie" = "pie";

// Wykres liniowy
  lineChartData: ChartData<"line"> = {labels: [], datasets: []};
  lineChartLabels: string[] = [];
  lineChartOptions: ChartConfiguration<"line">['options'] = {
    responsive: true,
    scales: {
      y: {beginAtZero: true, title: {display: true, text: 'Liczba transakcji'}},
      x: {title: {display: true, text: 'Data'}}
    }
  };
  lineChartType: "line" = "line";

// Histogram
  barChartData: ChartData<"bar"> = {labels: [], datasets: []};
  barChartLabels: string[] = [];
  barChartOptions: ChartConfiguration<"bar">['options'] = {
    responsive: true,
    scales: {
      y: {beginAtZero: true, title: {display: true, text: 'Amount of classifications'}},
      x: {title: {display: true, text: 'Classification accuracy range'}}
    }
  };
  barChartType: "bar" = "bar";

  ngOnInit() {
    this.prepareChartData();
  }

  prepareChartData() {
    const defaultPastDate = new Date();
    defaultPastDate.setDate(defaultPastDate.getDate() - 30);

    this.uploadService.fetchDataByDates(
      defaultPastDate,
      new Date()
    ).subscribe({
      next: (event: HttpEvent<TicketModel[]>) => {
        if (event.type === HttpEventType.Response) {
          this.tickets = event.body == null ? [] : event.body;
          this.prepareLineChartData();
          this.preparePieChartData();
          this.prepareBarChartData();
        }
      },
      error: (err) => {
        console.error('Błąd podczas pobierania danych:', err);
      }
    });
  }

  prepareLineChartData() {
    const dateCountMap = new Map<string, number>();

    this.tickets.forEach(ticket => {

      const dateStr = ("" + ticket.date).split("T")[0];
      dateCountMap.set(dateStr, (dateCountMap.get(dateStr) || 0) + 1);
    });

    // Sortowanie dat
    const sortedDates = Array.from(dateCountMap.keys()).sort();

    this.lineChartLabels = sortedDates;
    this.lineChartData = {
      labels: sortedDates,
      datasets: [{
        label: 'Liczba transakcji',
        data: sortedDates.map(date => dateCountMap.get(date) || 0),
        borderColor: '#3F51B5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        borderWidth: 2,
        pointRadius: 4,
        fill: true
      }]
    };
  }

  preparePieChartData() {
    const categoryMap = new Map<string, number>();

    this.tickets.forEach(ticket => {
      categoryMap.set(
        ticket.result,
        (categoryMap.get(ticket.result) || 0) + 1
      );
    });

    this.pieChartData = {
      labels: Array.from(categoryMap.keys()),
      datasets: [{
        data: Array.from(categoryMap.values()),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#8AC24A', '#607D8B', '#E91E63', '#9C27B0'
        ]
      }]
    };
  }

  prepareBarChartData() {
    // Tworzenie przedziałów kwotowych
    const amountRanges = [
      {min: 0, max: 50, label: '0%-50%'},
      {min: 50, max: 60, label: '50%-60%'},
      {min: 60, max: 70, label: '60%-70%'},
      {min: 70, max: 80, label: '70%-80%'},
      {min: 80, max: 90, label: '80%-90%'},
      {min: 90, max: 95, label: '90%-95%'},
      {min: 95, max: 98, label: '95%-98%'},
      {min: 98, max: Infinity, label: '>98%'}
    ];

    // Liczenie transakcji w przedziałach
    const rangeCounts = amountRanges.map(range => {
      return this.tickets.filter(t => {
          let maxProb = Math.max(t.changeProb, t.problemProb, t.reqProb) * 100
          console.log(maxProb)
          return maxProb >= range.min && maxProb < range.max
        }
      ).length;
    });

    console.log(rangeCounts)

    this.barChartLabels = amountRanges.map(r => r.label);
    this.barChartData = {
      labels: amountRanges.map(r => r.label),
      datasets: [{
        data: rangeCounts,
        label: 'Amount of predicitions in accuracy range',
        backgroundColor: '#3F51B5'
      }]
    };
  }
}
