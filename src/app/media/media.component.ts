import { Component, EnvironmentInjector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent {
  pic: string = "";
  opis: string = "";
  addPic(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/upload.php");
  }
}
