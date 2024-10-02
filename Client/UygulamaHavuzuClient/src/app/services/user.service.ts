import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { User } from '../entities/user';


@Injectable({
  providedIn: 'root'
})

export class UserService extends BaseService {

  constructor(private base: BaseService) {
    super(base.http);
  }

  private controllerUrl: string = "/users";

  public postUser(user: User): Observable<any> {
    return this.base.postReq(this.controllerUrl + '/registerUser', user)
  }

  public loginUser(user: User): Observable<any> {
    return this.base.postReq(this.controllerUrl + '/login', user);
  }

}
