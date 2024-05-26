import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  images: Array<any> = [];
  environment = environment;
  constructor (private backendService: BackendService) {}
  ngOnInit(): void {
    this.backendService.getPic().subscribe({next: (response) => {
      this.images = response
    }})      
  }
}

