import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// //Service
import { SessionService } from './session.service';

// //Models
import { LoginDTO } from '../../models/dto/user/login-dto';
import { RegisterDTO } from '../../models/dto/auth/register-dto';
import { AppUsuario } from '../../models/dto/user/app-usuario';
import { Token } from '../../models/dto/auth/token';
import { Environment } from '../../../environments/Environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = Environment.api_url;
  controlador: string = 'Usuario';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) { }

  async login(model: LoginDTO) {
    const response$ = this.httpClient.post<Token>(
      `${Environment.api_url}/${this.controlador}/login`,
      model
    );

    return await lastValueFrom(response$);
  }

  async getUserLogin(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const response$ = await this.httpClient.post<AppUsuario>(
      `${Environment.api_url}/${this.controlador}/informacionUsuario`,
      null,
      {
        headers,
      }
    );

    return await lastValueFrom(response$);
  }

  async register(model: RegisterDTO) {
    const response$ = this.httpClient.post<Token>(
      `${Environment.api_url}/${this.controlador}/registrar`,
      model
    );

    return await lastValueFrom(response$);
  }

}
