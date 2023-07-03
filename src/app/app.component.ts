import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { autoLogin } from './auth/store/auth.actions';
import { LoggingService } from './logging.service';
import { AppState } from './store/app.state.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
