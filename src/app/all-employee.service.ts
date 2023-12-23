import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllEmployeeService {

  private baseUrl:string = "https://6572df5d192318b7db412dfe.mockapi.io/employees";
  createAllEmployee: any;
  createEmployee: any;
 
  constructor(private _httpClient:HttpClient) { }

  getEmployees():Observable<any>{
    return this._httpClient.get(this.baseUrl);
  }

  createEmployees(data:any):Observable<any>{
    return this._httpClient.post(this.baseUrl+"/",data);
  }

  getFilteredEmployees(term:string):Observable<any>{
    return this._httpClient.get(this.baseUrl+"?filter="+term);
  }

  getSortedEmployees(column:string,order:string):Observable<any>{
    return this._httpClient.get(this.baseUrl+"?sortBy="+column+"&order="+order);
  }

  getPagedEmployees(pageno:number):Observable<any>{
    return this._httpClient.get(this.baseUrl+"?limit=5&page="+pageno);
  }

  deleteEmployees(id:string):Observable<any>{
    return this._httpClient.delete(this.baseUrl+"/"+id);
  }

  editEmployee(id:number, data:any):Observable<any>{
    return this._httpClient.put(this.baseUrl+"/"+id,data);
  }

  getEmployee(id:number):Observable<any>{
    return this._httpClient.get(this.baseUrl+"/"+id);
  }
}
