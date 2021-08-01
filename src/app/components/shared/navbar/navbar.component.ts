import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  @Output() search = new EventEmitter<any>()

  constructor(
  ) { 
  }

  searchSend(txt:any){
        this.search.emit(txt);
  }

}
