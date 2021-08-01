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
  user:any = {};

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
      },
      error => {
        this.getAllUsers();
      });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this._usersService.getUsers()
    .subscribe( (users:any) => {
      console.log(users[0]);
        this.users = users;
    });
  }

  open(content:any, id:any) {
    this.user = {};
    if(id != null){
      this._usersService.getUser(this.users[id].idUser)
      .subscribe( data => { 
         this.user = data;
         this.user.id = id; 
      });
    }
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

  saveUser(){
    this._usersService.saveUser(this.user)
      .subscribe( data => {
        if(this.user.hasOwnProperty("id")){
          console.log(this.user);
          this.users[this.user.id] = data;
        }else{
          this.users.push(data);
        }
    });
  }

  deleteUser(id_user: any,id:any){
    this._usersService.deleteUser(id_user)
      .subscribe(data =>{
      });
      delete this.users[id];
  }

}
