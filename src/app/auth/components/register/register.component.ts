import { Component, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// //Services
// import { UsuarioService } from '../../../pages/services/usuario.service';
//models
import { RegisterDTO } from '../../../models/dto/auth/register-dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  lang: string = 'es';
  form: FormGroup;
  loading: boolean = false;
  hide: boolean = true;

  private destroy$ = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    // private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
   
    this.form = this.formBuilder.group({
      nombres: [null, [Validators.required]],
      apellidos: [null],
      telefono: [null],
      correo: [null, [Validators.email, Validators.required]],
      confirm_correo: [null, [Validators.email, Validators.required]],
      clave: [null, [Validators.required, , Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-@$!%*#?&+]).{6,15}$")]],
      confirm_clave: [null, [Validators.required]],
    });

  }

  ngOnInit(): void { }

  validarCorreosCoinciden(campo: string, confirm: string) {
    let base = this.form.get(campo)?.value;
    let confirmacionBase = this.form.get(confirm)?.value;

    if (base != confirmacionBase) {
      this.form.get(confirm)?.setValue(null);
      this.form.get(confirm)?.setValidators([Validators.required]);
      this.form.get(confirm)?.updateValueAndValidity();
    }
  }

  async submit(e: Event) {
    e.preventDefault();

    if (this.form.valid) {
      this.validarCorreosCoinciden("correo", "confirm_correo");
      this.validarCorreosCoinciden("clave", "confirm_clave");

      if (this.form.valid) {
        this.loading = true;
        let { nombres, apellidos, telefono, correo, confirm_correo, clave } = this.form.value;
        let data: RegisterDTO = {
          nombres: nombres,
          apellidos: apellidos,
          correo: correo,
          confirmacion: confirm_correo,
          clave: clave,
          telefono: telefono
        }

        
      } else {
        this.loading = false;
        this.printErrors();
      }

    } else {
      this.loading = false;
      this.printErrors();
    }
  }

  printErrors() {
    Object.values(this.form.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}
