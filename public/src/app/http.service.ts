import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http:HttpClient) {}

  getTask(){
    return this._http.get('/tasks')
  }
  createTask(task){
    console.log("In the service create task")
    return this._http.post('/tasks',task);
  }
  getOneTask(taskId:String){
    console.log(taskId);
    return this._http.get(`/tasks/${taskId}`);
  }
  editTask(task:any){
    return this._http.put(`/tasks/${task._id}`,task)
  }
  deleteTask(taskId:String) {
    return this._http.delete(`/tasks/${taskId}`);
  }
}
