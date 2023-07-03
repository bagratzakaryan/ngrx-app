import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';
import { startEdit } from './store/shopping-list.actions';
import { AppState } from '../store/app.state.interface';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients$: Observable<{ ingridients: Ingredient[] }>;

  constructor(
    private loggingService: LoggingService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList');
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index: number): void {
    this.store.dispatch(startEdit({ payload: index }));
  }
}
