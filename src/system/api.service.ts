import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  requestUrl: string = environment.connectionLink;

  requestOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization, Access-Control-Allow-Methods, Access-Control-Allow-Origin'
    }),
    withCredentials: false
  };

  public uuid(): string {
    const isString = `${this.S4()}${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}`;

    return isString;
  }

  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  logIn(login: string, password: string, gcaptcha: string): Observable<HttpResponse<any>> {
    localStorage.setItem('login', login);

    // const body = new HttpParams()
    //   .set('DomainKey', 'liteconstruct.com')
    //   .set('g-recaptcha-response', gcaptcha)
    //   .set('login', login)
    //   .set('password', password)
    //   // .set('role', "1d021b86-41c6-47c1-a38e-0aa89b98dc28")
    //   .set('grant_type', 'password');
    const body = { "login": login, "password": password, "g-recaptcha-response": gcaptcha, "DomainKey": environment.domainKey };

    return this.http.post<any>(this.requestUrl + '/login', body, this.requestOptions);
  }

  logOut() {
    localStorage.removeItem('refresh_token');
    this.cookieService.delete('access_token');
    this.router.navigate(["/login"]);
  }

  setToken(token) {
    localStorage.setItem('refresh_token', token.refresh_token);
    let expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set("access_token", token.access_token, expireDate);
  }

  getAccessToken(): string {
    return this.cookieService.get('access_token');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  refreshExampleToken(): Observable<any> {
    return this.singleRefreshToken()
      .pipe(
        map(data => {
          this.setToken(data);
          return <any>data;
        }, err => {
          return <any>err;
        }));
  }

  singleRefreshToken(): Observable<HttpResponse<any>> {

    const body = new HttpParams()
      .set('refresh_token', localStorage.getItem('refresh_token'))
      .set('grant_type', 'refresh_token');

    return this.http.post<any>(this.requestUrl + '/oauth/token', body, this.requestOptions);
  }

}
