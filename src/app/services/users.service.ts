import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = environment.service.url;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
   }

   getUsers(){
    return this.http.get(`/user`, {  headers: this.headers  }).pipe( map( data => data ));
   }

   getUser(id_user: any){
    return this.http.get(`/user/${id_user}`, {  headers: this.headers  }).pipe( map( data => data ));
   }

   getSearchUsers(search : any){
    return this.http.get(`/user/query?name=${search}`, {  headers: this.headers  }).pipe( map( data => data ));
   }

   saveUser(user: any) {
    let body = JSON.stringify(user);
    return this.http.post(`/user`, body , { headers: this.headers });
   }

   deleteUser( id : any ) {
    return this.http.delete(`/user/${ id }`, { headers: this.headers });
   }
   
}
