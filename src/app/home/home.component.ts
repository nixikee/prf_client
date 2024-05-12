import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  path1 = "assets/images/debrecen.jpg";
  path2 = "assets/images/ven.jpg";
  path3 = "assets/images/szin.jpg";
}
