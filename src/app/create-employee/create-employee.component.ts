import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllEmployeeService } from '../all-employee.service';
import { ActivatedRoute } from '@angular/router';

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
  });

  public id:any = "";

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

  constructor(private _allemployeeService:AllEmployeeService, private _activatedRoute: ActivatedRoute){
    _activatedRoute.params.subscribe(
      (data:any)=>{
        this.id = data.id;
        if(this.id){
          _allemployeeService.getEmployee(data.id).subscribe(
            (data:any)=>{
              this.employeeForm.patchValue(data);
              const hikesFormArray = this.employeeForm.get('hikes') as FormArray;

      // Clear existing form array items
      while (hikesFormArray.length) {
        hikesFormArray.removeAt(0);
      }

      // Patch values for each item in the array
      for (const hike of data.hikes) {
        hikesFormArray.push(
          new FormGroup({
            year: new FormControl(hike.year),
            percentage: new FormControl(hike.percentage),
          })
        );
      }
            },
            (err:any)=>{
              alert('Internal server error');
            }
          )
        }
      }
    )
  }

  submit(){
    console.log(this.employeeForm.value);

    if(this.id){
      this._allemployeeService.editEmployee(this.id,this.employeeForm.value).subscribe(
        (data:any)=>{
          alert('Employee updated successfully');
        },
        (err:any)=>{
          alert('Internal server error');
        }
      )
    }
    else{
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
    
  }
