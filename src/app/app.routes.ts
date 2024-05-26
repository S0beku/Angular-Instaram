import { Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MediaComponent } from './media/media.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: MediaComponent,
        canActivate: [authGuard]
    },
    {
        path: 'MainSite',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'AddPicture',
        component: MediaComponent
    },
    {
        path: 'Register',
        component: RegisterComponent
    },
    {
        path: 'Login',
        component: LoginComponent
    }
];
