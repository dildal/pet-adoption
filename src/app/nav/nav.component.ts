import { Component, OnInit } from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
	
  private items: MenuItem[];
  edit: Boolean = false;
  constructor() { }

  ngOnInit() {
  	this.items = [
                {label: 'Home', icon: 'fa-home', routerLink: ['/animals'], routerLinkActiveOptions: { exact: true }},
                {label: 'Put Up an Animal', icon: 'fa-paw', routerLink: ['/animal/new'], routerLinkActiveOptions: { exact: true }},
            ]
  	}

}
