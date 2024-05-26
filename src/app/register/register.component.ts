import { Component, EnvironmentInjector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor (private backendService: BackendService, private router: Router) {}
  login:string = "";
  password:string = "";
  age:number = 0;
  addUser(): void {
    this.backendService.addUser(this.login, this.password, this.age).subscribe({next:(response) => {
      this.router.navigateByUrl('/Login');
    }});
  }
}
