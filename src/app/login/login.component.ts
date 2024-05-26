import { Component, EnvironmentInjector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor (private backendService: BackendService, private router: Router) {}
  login:string = "";
  password:string = "";
  checkUser(): void {
    this.backendService.checkUser(this.login, this.password).subscribe({
      next:(response) => {
        if(response.token) {
          this.router.navigateByUrl('/');
        }
      }
    });
  }

  ngOnInit(): void {
    localStorage.removeItem("Token");
    this.router.navigateByUrl('/');
  }
}
