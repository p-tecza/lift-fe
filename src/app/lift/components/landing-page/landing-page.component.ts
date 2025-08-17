import {Component} from '@angular/core';
import {Transaction} from "../../model/transaction.model";
import {NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartType} from "chart.js";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    NgChartsModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  transactions: Transaction[] = [
    {id: 1, title: 'Zakupy spożywcze', amount: 150.23, date: new Date('2024-05-15'), category: 'Jedzenie'},
    {id: 2, title: 'Bilet miesięczny', amount: 100, date: new Date('2024-05-10'), category: 'Transport'},
    {id: 3, title: 'Kino', amount: 45, date: new Date('2024-05-18'), category: 'Rozrywka'},
    {id: 4, title: 'Czynsz', amount: 1200, date: new Date('2024-05-01'), category: 'Mieszkanie'},
    {id: 5, title: 'Prezent', amount: 80, date: new Date('2024-04-28'), category: 'Inne'},
    {id: 6, title: 'Laptop', amount: 3200, date: new Date('2024-04-20'), category: 'Elektronika'},
    {id: 7, title: 'Książki', amount: 120, date: new Date('2024-05-22'), category: 'Edukacja'},
    {id: 8, title: 'Restauracja', amount: 90, date: new Date('2024-05-21'), category: 'Jedzenie'},
    {id: 9, title: 'Ubezpieczenie', amount: 220, date: new Date('2024-05-05'), category: 'Finanse'},
    {id: 10, title: 'Siłownia', amount: 70, date: new Date('2024-05-12'), category: 'Zdrowie'},
    {id: 11, title: 'Owoce', amount: 30, date: new Date('2024-05-17'), category: 'Jedzenie'},
    {id: 12, title: 'Taksówka', amount: 25, date: new Date('2024-05-19'), category: 'Transport'},
  ];

// Wykres kołowy
  pieChartData: ChartData<"pie"> = { labels: [], datasets: [] };
  pieChartLabels: string[] = [];
  pieChartOptions: ChartConfiguration<"pie">['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'right' }
    }
  };
  pieChartType: "pie" = "pie";

// Wykres liniowy
  lineChartData: ChartData<"line"> = { labels: [], datasets: [] };
  lineChartLabels: string[] = [];
  lineChartOptions: ChartConfiguration<"line">['options'] = {
    responsive: true,
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Liczba transakcji' } },
      x: { title: { display: true, text: 'Data' } }
    }
  };
  lineChartLegend = true;
  lineChartType: "line" = "line";

// Histogram
  barChartData: ChartData<"bar"> = { labels: [], datasets: [] };
  barChartLabels: string[] = [];
  barChartOptions: ChartConfiguration<"bar">['options'] = {
    responsive: true,
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Liczba transakcji' } },
      x: { title: { display: true, text: 'Przedział kwotowy' } }
    }
  };
  barChartLegend = true;
  barChartType: "bar" = "bar";

  ngOnInit() {
    this.prepareChartData();
  }

  prepareChartData() {
    this.prepareLineChartData();
    this.preparePieChartData();
    this.prepareBarChartData();
  }

  prepareLineChartData() {
    // Grupowanie transakcji po dacie
    const dateCountMap = new Map<string, number>();

    this.transactions.forEach(transaction => {
      const dateStr = transaction.date.toISOString().split('T')[0];
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

    this.transactions.forEach(transaction => {
      categoryMap.set(
        transaction.category,
        (categoryMap.get(transaction.category) || 0) + 1
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
      {min: 0, max: 50, label: '0-50 zł'},
      {min: 51, max: 100, label: '51-100 zł'},
      {min: 101, max: 200, label: '101-200 zł'},
      {min: 201, max: 500, label: '201-500 zł'},
      {min: 501, max: 1000, label: '501-1000 zł'},
      {min: 1001, max: Infinity, label: '>1000 zł'}
    ];

    // Liczenie transakcji w przedziałach
    const rangeCounts = amountRanges.map(range => {
      return this.transactions.filter(t =>
        t.amount >= range.min && t.amount <= range.max
      ).length;
    });

    this.barChartLabels = amountRanges.map(r => r.label);
    this.barChartData = {
      labels: amountRanges.map(r => r.label),
      datasets: [{
        data: rangeCounts,
        label: 'Liczba transakcji',
        backgroundColor: '#3F51B5'
      }]
    };
  }
}
