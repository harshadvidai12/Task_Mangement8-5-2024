import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class appService {
    dataListUpdated$: any;
  
    constructor() { }
    private dataSubject$ = new Subject<any>();
    data$ = this.dataSubject$.asObservable();
  
    updateData(newData: any) {
      this.dataSubject$.next(newData);
    }

   
  private editTaskSubject$ = new Subject<any>();
  editTask$ = this.editTaskSubject$.asObservable();

  editTask(title: string) {
    this.editTaskSubject$.next(title);
  }
    
  }

  
