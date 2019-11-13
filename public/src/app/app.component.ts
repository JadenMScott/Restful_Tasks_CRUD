import { HttpService } from './http.service';
import { Component,OnInit } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _httpService:HttpService){}
  title = 'Jaden';
  tTask=[];
  task:any;
  onCreateErrors:any;
  onUpdateErrors:any;
  toUpdateTask:boolean=false;
  editTask:any;
  parentShowTask:any;
  ngOnInit() {
    this.getTasksFromService();
    this.task={title : "",description:""}
  }
  getTasksFromService(){
    this._httpService.getTask().subscribe(data =>{
      console.log(data);
      this.tTask=data['allTasks']
    })
  }

  onSubmit(){
    console.log("In Angular Submit",this.task)
    this._httpService.createTask(this.task)
    .subscribe(data=>{
      if(data['status']){
        this.onCreateErrors=undefined;
        this.ngOnInit();
      }
      else{
        this.onCreateErrors=data['errors'];
      }
    })
    this.task={name:''}
  }
  editTaskForm (taskId:String) {
    this.toUpdateTask =true;
    console.log(`task id is ${taskId}`);
    this._httpService.getOneTask(taskId)
    .subscribe(responseFromHTTPService => {
      console.log(responseFromHTTPService);
      this.editTask=responseFromHTTPService["oneTask"];
    })
  }
  updateTask() {
    this._httpService.editTask(this.editTask)
    .subscribe(responseFromService => {
      console.log(responseFromService);
      if(responseFromService['status']){
        this.getTasksFromService();
        this.onCreateErrors=undefined;
        this.toUpdateTask=false;
      }
      else{
        this.onUpdateErrors=responseFromService['errors'];
      }
    })
  }
  deleteTask(taskId:String) {
    this._httpService.deleteTask(taskId)
    .subscribe(responseFromService => {
      console.log(responseFromService);
      if(responseFromService['status']){
        this.getTasksFromService();
      }
      else{
        console.log(responseFromService['errors']);
      }
    })
  }
  getTask(taskId:String) {
    this._httpService.getOneTask(taskId)
    .subscribe(responseFromService =>{
      if(responseFromService['status']){
        this.parentShowTask=responseFromService['task']
        console.log(this.parentShowTask);
      }
    })
  }
}

