import { Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MediaComponent } from './media/media.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'MainSite',
        pathMatch: 'full'
    },
    {
        path: 'MainSite',
        component: DashboardComponent
    },
    {
        path: 'AddPicture',
        component: MediaComponent
    }
];
