import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import { AppState } from '../store/app.state.interface';
import { logout } from '../auth/store/auth.actions';
import { fetchRecipes, storeRecipes } from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;

  private userSub: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  onSaveData() {
    this.store.dispatch(storeRecipes());
  }

  onFetchData() {
    this.store.dispatch(fetchRecipes());
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
