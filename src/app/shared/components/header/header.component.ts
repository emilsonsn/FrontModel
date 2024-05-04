import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '@services/local-storage.service';
import { SessionService } from '@store/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  public title: string;

  constructor(
    private readonly sessionService: SessionService,
		private readonly storage: LocalStorageService,
  ) { }

  ngOnInit(): void {
  }

}
