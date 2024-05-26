import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BackendService } from './services/backend.service';

export const authGuard: CanActivateFn = (route, state) => {
    if (!inject(BackendService).isLoggedIn("")) {
        inject(Router).navigateByUrl('/login');
        return false;
    } else {
        return true;
    }
};