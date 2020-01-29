import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isCollapse: boolean;
  
  constructor() { }

  sidebarToggle() {
    $('.sidebar').toggleClass('toggled');
    $('app-sidebar').toggleClass('toggled');
    $('.content').toggleClass('sidebar-toggled');
  }

  ngOnInit() {
  }

}
