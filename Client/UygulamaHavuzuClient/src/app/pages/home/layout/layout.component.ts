import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  isContentVisible: boolean = false;

  constructor(private router: Router, private UserService:UserService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Eğer yönlendirme tamamlandıysa, içerik görünür
        this.isContentVisible = event.url !== '/';
      }
    });
    // this.UserService.getUsers().subscribe((response) => {
    //   console.log(response);
    // });

  }
}
