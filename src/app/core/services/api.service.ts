import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { Subject, Observable } from 'rxjs';

export const apiNotifier = new Subject();

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  error: any = {};
  authorization: any;
  apiHeaders: any;
  categories: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toasterService: ToastrService,
    private authService: AuthService,
    private userService: UserService
  ) {
   }

  headers = () => {
    this.authorization = this.authService.decryption();
    this.apiHeaders = new HttpHeaders();
    this.apiHeaders.headers['Accept'] = 'application/json';
    this.apiHeaders.headers['X-REQUEST-TYPE'] = 'web';
    if (localStorage.getItem('currentLanguage')) {
      this.apiHeaders.headers['X-LANGUAGE-CODE'] = localStorage.getItem('currentLanguage');
    } else {
      this.apiHeaders.headers['X-LANGUAGE-CODE'] = 'en';
    }
    if (this.authorization.hasOwnProperty('response')) {
      this.apiHeaders.headers['Authorization'] = 'Bearer ' + this.authorization.response.access_token;
    }
    return this.apiHeaders;
  }
  callGetAPI(url: string) {
    return this.http.get<any>(environment.apiUrl + url, this.headers())
      .pipe(map(
        data => {
          return data;
        }
      ));
  }
  callPostAPI(url: string, parameters: any) {
    return this.http.post<any>(environment.apiUrl + url, parameters, this.headers())
      .pipe(map(
        data => {
          return data;
        }
      ));
  }
  callPutAPI(url: string, parameters: any) {
    return this.http.put<any>(environment.apiUrl + url, parameters, this.headers())
      .pipe(map(
        data => {
          return data;
        }
      ));
  }
  callDeleteAPI(url: string) {
    return this.http.delete<any>(environment.apiUrl + url, this.headers())
      .pipe(map(
        data => {
          return data;
        }
      ));
  }
  successResponse(data, url = null) {
    if (data.statusCode === 200 && data.error === false) {
      this.toasterService.success('', data.message);
      if (url) {
        this.router.navigate([url.redirect]);
      }
    }
  }

  failureResponse(data, url = null) {
    this.error = {};
    if (data.error.statusCode === 422 || data.error.statusCode === 500) {
      if (typeof data.error.message === 'string' || data.error.message instanceof String) {
        this.error.commonError = data.error.message;
      } else {
        this.error = data.error.message;
      }
    } else if (data.error.statusCode === 401) {
      this.authService.logout(false);
      this.userService.displayPopup('sign-in');
    } else if (data.error.statusCode === 403) {
      this.authService.logout(false);
      if (data.error.message && data.error.message !== '') {
        this.toasterService.error('', data.error.message);
      }
    } else if (data.error.statusCode === 404) {
      this.router.navigate(['404']);
      return false;
    } else {
          if (data.error.message && data.error.message !== '') {
            this.toasterService.error('', data.error.message);
          }
        }
    if (url) {
      window.history.back();
    }
    return this.error;
  }
}
