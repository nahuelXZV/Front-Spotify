import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  handleButtonUser() {
    this.router.navigate(['users'], { relativeTo: this.route });
  }

  handleButtonGenre() {
    this.router.navigate(['genres'], { relativeTo: this.route });
  }

  handleButtonSong() {
    this.router.navigate(['songs'], { relativeTo: this.route });
  }
}
