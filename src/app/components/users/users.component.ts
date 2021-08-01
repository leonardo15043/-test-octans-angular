import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  closeResult: string;  
  users:any = [];
  @Input('data') item: any;

  constructor(
    private modalService: NgbModal,
    private _usersService: UsersService
  ) {
    this.closeResult = ""; 
  }

  ngOnChanges(){
    this._usersService.getSearchUsers(this.item)
        .subscribe( users => {
          this.users = users;
        });
  }

  ngOnInit(): void {
    this._usersService.getUsers()
    .subscribe( users => {
        this.users = users;
    });
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
