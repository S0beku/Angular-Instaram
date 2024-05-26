import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screedWidth = 0;
  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screedWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screedWidth <= 768 && this.screedWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
