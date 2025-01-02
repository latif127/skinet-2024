import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';
import { map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountServive = inject(AccountService);
  const router = inject(Router);
  
  if (accountServive.currentUser()){
    return of(true);
  }else{
    return accountServive.getAuthState().pipe(
      map(auth => {
        if (auth.isAuthenticated){
          return true;
        }else{
          router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}});
          return false;
        }
      })
    )
  }    
};
