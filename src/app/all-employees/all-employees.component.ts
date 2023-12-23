import { Component } from '@angular/core';
import { AllEmployeeService } from '../all-employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss']
})
export class AllEmployeesComponent {

  public employees:any = [];

  // Filter Method
  public term:string = "";

  // Sorting
  public column:string = "";
  public order:string = "";

  // Pagination
  public pageno:number = 0;
  
  constructor(private _allemployeesService: AllEmployeeService, private _router: Router){

    _allemployeesService.getEmployees().subscribe(
      (data:any)=>{
        this.employees = data;
      },
      (err:any)=>{
        alert('Internal server error');
      }
    )
  }

  getFilteredEmployees(){
    this._allemployeesService.getFilteredEmployees(this.term).subscribe(
      (data:any)=>{
        this.employees = data;
      },
      (err:any)=>{
        alert("Internal Server Error");
      }
    )
  }

  sort(){
    this._allemployeesService.getSortedEmployees(this.column,this.order).subscribe(
      (data:any)=>{
        this.employees = data;
      },
      (err:any)=>{
        alert("Internal Server Error");
      }
    )
  }

  pagination(){
    this._allemployeesService.getPagedEmployees(this.pageno).subscribe(
      (data:any)=>{
        this.employees = data;
      },
      (err:any)=>{
        alert("Internal Server Error");
      }
    )
  }

  delete(id:string){
    this._allemployeesService.deleteEmployees(id).subscribe(
      (data:any)=>{
        alert('deleted successfully');
        location.reload();
      },
      (err:any)=>{
        alert('Internal server error');
      }
    )
  }

  view(id:number){
    this._router.navigateByUrl("/dashboard/employee-view/"+id);
  }

  edit(id:number){
    this._router.navigateByUrl("dashboard/edit-employee/"+id);
  }
}
