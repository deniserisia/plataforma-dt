import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(private breakpointObserver: BreakpointObserver) { }

  toggleSidenav(){
     this.sidenav.toggle();
     console.log(this.sidenav.opened)
  }

  isSidenavOpen() {
    return this.breakpointObserver.isMatched('(min-width: 901px)');
  }

  getSidenavMode() {
    return this.breakpointObserver.isMatched('(min-width: 901px)') ? 'side' : 'over';
  }
}
