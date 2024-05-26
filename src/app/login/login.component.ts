import { Component, EnvironmentInjector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor (private backendService: BackendService) {}
  login:string = "";
  password:string = "";
  checkUser(): void {
    this.backendService.checkUser(this.login, this.password).subscribe();
  }
}
