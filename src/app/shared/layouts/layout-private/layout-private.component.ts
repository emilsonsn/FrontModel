import { Component, OnInit } from '@angular/core';
import { SidebarService } from '@services/sidebar.service';

@Component({
  selector: 'app-layout-private',
  templateUrl: './layout-private.component.html',
  styleUrls: ['./layout-private.component.scss']
})
export class LayoutPrivateComponent implements OnInit {

  constructor(
    public sidebarService: SidebarService,
  ) { }

  ngOnInit(): void {
  }

}
