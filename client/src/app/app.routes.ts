import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LogsComponent } from './components/logs/logs.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UsersComponent } from './components/users/users.component';


export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'Dashboard',
        component: DashboardComponent,
        // children: [
        //     {
        //         path: 'AllUsers',
        //         component: UsersComponent
        //     },
        // ]
    },


    // Navbar Links
    {
        path: 'About',
        component: AboutComponent
    },
    {
        path: 'Projects',
        component: ProjectsComponent
    },
    {
        path: 'AllLogs',
        component: LogsComponent
    },
    {
        path: 'AllUsers',
        component: UsersComponent,
    },
    //


    {
        path: 'Profile',
        component: ProfileComponent,
    },

    
];
