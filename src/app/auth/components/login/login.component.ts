import { Component, OnInit, OnDestroy, isDevMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';
import { LoginDTO } from '../../../models/dto/user/login-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    if (this.sessionService.isSessionValid()) {
      this.router.navigate(['/home/dashboard']);
      return;
    }

    let user: string = '',
      password: string = '';

    if (isDevMode()) {
      user = 'superadmin@interrapidisimo.com';
      password = 'Abcde123456+.+';
    }

    this.loginForm = this.fb.group({
      email: [user, [Validators.required, Validators.email]],
      password: [password, [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }


  async submit(e: Event) {
    e.preventDefault();
    if (this.loginForm.valid) {
      this.loading = true;

      let data: LoginDTO = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        authDate: new Date()
      };

      await this.authService.login(data)
        .then(async (result) => {
          await this.authService
            .getUserLogin(result.token)
            .then((user) => {
              user.token = result;
              this.sessionService.setCuerrentUserValue(user);
              this.router.navigate(['home/dashboard']);
            })
            .catch((error) => {
              this.loading = false;
              let mensajeError = "Error Inesperado";
              if (error.hasOwnProperty('error')) {
                mensajeError = this.returnError(error.error);
              }
              this.message.error(mensajeError);
            });
        })
        .catch((error) => {
          this.sessionService.clearUser();
          this.loading = false;
          let mensajeError = "Error Inesperado";

          if (error.hasOwnProperty('error')) {
            if (
              error.error.hasOwnProperty('code') &&
              !error.error.hasOwnProperty('message')
            ) {
              mensajeError = this.returnError(error.error);
            }

          } else {
            mensajeError = error.message;
          }
          this.message.error(mensajeError);
        });

    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  returnError(ResponseBase: any): string {
    let mensajeError = '';
    switch (ResponseBase.error.code) {
      case 0:
      case 1:
        mensajeError = "Usuario o contraseña incorrecta"
        break;
      case 2:
      case 4:
        mensajeError = "Usuario sin asignacion de accesos";
        break;
      case 3:
        mensajeError = "Error iniciando Sesión"
        break;
    }
    return mensajeError;
  }

  goToRegister(): void {
    this.router.navigate(['/auth/registro']);
  }

  goToForgotPassword(): void {
    this.message.info('Funcionalidad en desarrollo');
  }
}
