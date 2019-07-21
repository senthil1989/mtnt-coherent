import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as cryptoJS from 'crypto-js';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private toasterService: ToastrService,
    private translate: TranslateService) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'X-REQUEST-TYPE': 'web'
    })
  };

  login(data: any) {
    const provider = (data.provider === 'NORMAL') ? 'normal' : (data.provider === 'FACEBOOK') ? 'fb' : 'google+';
    const authToken = (data.provider === 'NORMAL') ? '' : data.authToken;
    const socialUserId = (data.provider === 'NORMAL') ? '' : data.id;
    return this.http.post<any>(
      environment.apiUrl + 'v2/auth/login',
      {
        login_type: provider,
        acesstype: 'web',
        email: data.email,
        password: (data.password) ? data.password : '',
        social_user_id: socialUserId,
        token: authToken,
        name: (data.name) ? data.name : '',
        profile_picture: (data.photoUrl) ? data.photoUrl : ''
      },
      this.httpOptions
    )
      .pipe(map(
        user => {
          if (user['statusCode'] === 200 && user['error'] === false) {
            if (data.provider !== 'NORMAL') {
              user.response.name = data.name;
            }
            const userData = this.encryption(user);
          }
          return user;
        }
      ));
  }

  logout(showToaster = true) {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
    let getMessage;
    this.translate.get('LOGOUT.LOGOUT_MESSAGE').subscribe(res => {
      getMessage = res;
    });
    this.toasterService.success('', getMessage);
  }

  encryption(user) {
    return cryptoJS.AES.encrypt(JSON.stringify(user), environment.encryption_key);
  }

  decryption(data = null) {
    const currentUser = (data === null) ? localStorage.getItem('currentUser') : data;
    let decryptUser = {};
    if (currentUser) {
      decryptUser = cryptoJS.AES.decrypt(currentUser.toString(), environment.encryption_key);
      decryptUser = JSON.parse((decryptUser as Buffer).toString(cryptoJS.enc.Utf8));
    }
    return decryptUser;
  }
}
