import { Injectable, Inject } from '@angular/core';

import { from as observableFrom, of as observableOf, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from "src/core/service/api.service";


export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

export interface LoginContext {
  username: string;
  password: string;
}

const credentialsKey = 'token';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  public token: any;

  private path: string = "user";

  private _credentials: string;
  private _features: any = null;
  
  constructor(
    private router: Router, public api: ApiService) {
    this._credentials = localStorage.getItem(credentialsKey);
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(param: any): Observable<any> {   
    return this.api.filter(this.path, param);
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return observableOf(true);
  }

  logOut(){
    this.token = false;
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */

  isAuthenticated(): any {
    try {
      return (this.token);
    } catch (e) {
      return false;
    }
  }

  setAuthenticated(usr:any, rl:any): boolean {
    try {
      this.token = this.genToken;
      console.log(this.token);
      return (this.token);
    } catch (e) {
      return false;
    }
  }

  genToken(usr: any, rl:any):any {
    var subT = usr;
    var nJwt = require('njwt');
    var secureRandom = require('secure-random');

    var signingKey = secureRandom(256, { type: 'Buffer' }); // Create a highly random byte array of 256 bytes

    var claims = {
      iss: "localhost:8090/api/dipendenti",  // The URL of your service
      sub: subT,    // The UID of the user in your system
      scope: rl
    }

    var jwt = nJwt.create(claims, signingKey);
  }


  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): string {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   */
  private setCredentials(credentials?: string) {
    this._credentials = credentials || null;

    if (credentials) {
      localStorage.setItem(credentialsKey, credentials);
    } else {
      //sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

}
