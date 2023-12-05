import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { UsersComponent } from './pages/users/users.component';
import { GenresComponent } from './pages/genres/genres.component';


@NgModule({
    declarations: [
        DashboardComponent,
        UsersComponent,
        GenresComponent
    ],
    imports: [
        CommonModule,
        DashboardRutingModule,
        SharedModule
    ]
})
export class DashboardModule { }
