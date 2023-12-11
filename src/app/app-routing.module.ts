import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthenticationGuard } from './authentication.guard';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { NotifyGuard } from './notify.guard';

const routes: Routes = [
  // General routing
  {path: 'login',component:LoginComponent},
  // Child routing
  {path: 'dashboard', canActivate:[AuthenticationGuard], component: DashboardComponent, children:[
      {path: 'home',component: HomeComponent},
      {path: 'create-employee', canDeactivate:[NotifyGuard], component: CreateEmployeeComponent},
      {path: 'all-employee', component: AllEmployeesComponent}
  ]},
  // Empty routing
  {path: '',component: LoginComponent},
  // Wildcard routing
  {path: '**',component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


