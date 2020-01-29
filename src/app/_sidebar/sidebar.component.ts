import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems : Array<Object> = [
    {name:"Users Management", link:"users"}
  ];

  constructor() { }

  ngOnInit() {
  }

}
