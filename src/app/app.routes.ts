import { Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MediaComponent } from './media/media.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'Login',
        pathMatch: 'full'
    },
    {
        path: 'MainSite',
        component: DashboardComponent
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
