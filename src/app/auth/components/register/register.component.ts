import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, takeUntil } from 'rxjs';

// //Services
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';

// //Models
import { RegisterDTO } from '../../../models/dto/auth/register-dto';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  passwordVisible = false;
  confirmPasswordVisible = false;
  loading = false;
  acceptTerms = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombres: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [null, [Validators.required]],
      clave: ['', [Validators.required, this.passwordValidator]],
      confirmacion: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    let value = control.value;
    if (!value) {
      return null;
    }

    let hasUpperCase = /[A-Z]/.test(value);
    let hasLowerCase = /[a-z]/.test(value);
    let hasNumeric = /[0-9]/.test(value);

    let passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    let password = group.get('clave')?.value;
    let confirmPassword = group.get('confirmacion')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async submitForm(e: Event) {
    e.preventDefault();
    if (this.registerForm.valid) {
      this.loading = true;
      let telefono = this.registerForm.value.telefono;
      let registerData = this.registerForm.value as RegisterDTO;
      registerData.telefono = String(telefono);
      console.log(registerData)
      await this.authService
        .register(registerData)
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
              this.message.error(mensajeError);
              console.log(error);
            });
        }).catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        })
    } else {
      Object.values(this.registerForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['']);
  }

  getPasswordErrorTip(): string {
    const control = this.registerForm.get('clave');
    if (control?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    if (control?.hasError('passwordStrength')) {
      return 'La contraseña debe contener mayúsculas, minúsculas y números';
    }
    return '';
  }

  getConfirmPasswordErrorTip(): string {
    const control = this.registerForm.get('confirmacion');
    if (control?.hasError('required')) {
      return 'Confirma tu contraseña';
    }
    if (this.registerForm.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }
}
