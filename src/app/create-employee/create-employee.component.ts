import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllEmployeeService } from '../all-employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {

  public employeeForm:FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    company: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    role: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    package: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    dob: new FormControl(),
    address: new FormGroup({
      addressLine: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      pincode: new FormControl(),
    }),
    hikes: new FormArray([]),
    workMode: new FormControl(),
    travelFee: new FormControl(),
    WifiBill: new FormControl()
  })

  get hikesFormArray(){
    return this.employeeForm.get('hikes') as FormArray;
  }

  add(){
    this.hikesFormArray.push(
      new FormGroup({
        year: new FormControl(),
        percentage: new FormControl()
      })
    )
  }

  delete(i:number){
    this.hikesFormArray.removeAt(i);
  }

  constructor(private _allemployeeService:AllEmployeeService){}

  submit(){
    console.log(this.employeeForm.value);

    this._allemployeeService.createEmployees(this.employeeForm.value).subscribe(
      (data:any)=>{
        alert('Employee created successfully');
      },
      (err:any)=>{
        alert('Internal server error');
      }
    )
  }
}
