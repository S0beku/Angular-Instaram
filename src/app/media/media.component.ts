import { Component, EnvironmentInjector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent {
  constructor (private backendService: BackendService) {}
  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!file) resolve('');

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result) resolve(reader.result.toString());
        };
    });
}
async addPic(imageInput: any): Promise<void> {
  let base64 = await this.getBase64(imageInput.files[0]);

  this.backendService.addPic(this.opis, base64).subscribe({
      next: (response) => {
          if (response.status) {
              alert('Pomyślnie dodano zdjęcie!');
          }
      },
  });
}
  opis: string = "";
}
