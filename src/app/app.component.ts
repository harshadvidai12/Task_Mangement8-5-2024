import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'taskManagers';

  public fromShow:boolean=false;
  constructor() {}
  ngOnInit() {
}
showForm(){
  this.fromShow=!this.fromShow;
}  
}
