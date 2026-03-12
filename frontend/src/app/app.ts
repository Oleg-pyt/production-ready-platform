import { Component, OnInit, signal } from '@angular/core';
import { HealthService } from './health/health.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly status = signal<string>('loading...');

  constructor(private healthService: HealthService) {}

  ngOnInit(): void {
    this.healthService.check().subscribe({
      next: (r) => this.status.set(r.status ?? 'unknown'),
      error: () => this.status.set('error')
    });
  }
}
