import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() route: string = '';

  constructor(private router: Router) { }

  navigate() {
    this.router.navigate([this.route]);
  }
}
