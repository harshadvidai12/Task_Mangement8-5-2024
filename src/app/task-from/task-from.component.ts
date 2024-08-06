  import { Component, Input } from '@angular/core';
  import { FormBuilder, FormGroup,Validators } from '@angular/forms';
  import { appService } from '../app.service';
  import { Subscription } from 'rxjs';
  @Component({
    selector: 'app-task-from',
    templateUrl: './task-from.component.html',
    styleUrls: ['./task-from.component.scss']
  })
  export class TaskFromComponent {
    taskForm!: FormGroup;
    @Input() selectedTask: any;
    // subscription: Subscription;
    myDataArray: any[] = []; 
    subscription: Subscription;
    isEditing = false;
    constructor(private fb: FormBuilder, private appServ: appService){
      this.taskForm = this.fb.group({
        title:['',Validators.required],
        status:['null',Validators.required],
        priority:['null',Validators.required],
        dueDate:['',Validators.required]
      });
      this.subscription = this.appServ.editTask$.subscribe((task: any) => {
        this.patchTaskForm(task);
      });
    
      
    }
    ngOnInIt(){

    }
    onSubmit() {
      if(this.taskForm.valid){

     
      const formData = this.taskForm.value;
      const index = this.myDataArray.findIndex((task: any) => task.title === formData.title);
      if (index !== -1) {
        this.myDataArray[index] = formData;
      } else {
        this.myDataArray.push(formData);
      }
      this.appServ.updateData(this.myDataArray);
      this.clearform();
    }
    
    }
    clearform(){
      this.taskForm.patchValue({
        title: null,
        status:null,
        priority:null,
        dueDate:null
      });
    }
  patchTaskForm(title: string) {
    const task = this.myDataArray.find((task: any) => task.title === title);
    if (task) {
      this.taskForm.patchValue({
        title: task.title,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status
      });
    }
    
  }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  }
