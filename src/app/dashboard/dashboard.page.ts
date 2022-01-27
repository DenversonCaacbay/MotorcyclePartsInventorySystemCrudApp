import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  taskForm = new FormGroup({
    id: new FormControl(''),
    product_name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
  });

  tasks: [];
  enableEdit = false;
  selectedTask: any;
  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.displayTasks();
  }

  displayTasks() {
    this.tasksService.getTasks().subscribe((result:any) => {
      //place the return to you variable tasks array
       this.tasks = result.tasks;
    });
 }

 onSubmit(){

  let formValue = this.taskForm.value;
  if(this.enableEdit) {
    this.tasksService.updateTask(formValue).subscribe((result : any) => {
      console.log(result);
    });
  }else{
    this.tasksService.saveTask(formValue).subscribe((result: any) => {
      console.log(result);
    });
  }

}

editTask(event) {
  let id = parseInt(event.target.id);
  this.tasksService.getTaskDetail(id).subscribe((result: any) => {
    this.taskForm.patchValue(result);
    this.enableEdit = true;
  });
}


deleteTask(event){
  let id = parseInt(event.target.id);
  this.tasksService.deleteTask(id).subscribe((result: any) => {
    console.log(result);
  });
}


}
