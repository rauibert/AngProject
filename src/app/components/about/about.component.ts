import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public tittle: string;
  public subtittle: string;
  public web: string;

  constructor() { 
    this.tittle = "Rauibert";
    this.subtittle = "Desarrollador web";
    this.web = "rauibert.es";
   }

  ngOnInit(): void {
  }

}
