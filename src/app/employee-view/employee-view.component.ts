import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllEmployeeService } from '../all-employee.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent {

  public employee:any = {};

  constructor(private _activatedRoute: ActivatedRoute, private _allemployeeService: AllEmployeeService){

    _activatedRoute.params.subscribe(
      (data:any)=>{
        console.log(data.id);
        _allemployeeService.getEmployee(data.id).subscribe(
          (data:any)=>{
            this.employee = data;
          },
          (err:any)=>{
            alert('Internal servewr error');
          }
        )
      }
    )
  }
}
