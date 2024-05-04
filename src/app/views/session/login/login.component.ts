import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { SessionService } from '@store/session/session.service';
import { SharedAnimations } from '@shared/animations/shared-animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
	animations: [SharedAnimations]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  showPassword: boolean = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _route: Router,
    private readonly _sessionService: SessionService,
    private readonly _toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      rememberMe: [false, [Validators.required]]
    })
  }

  forgotPassword(): void {
    this._route.navigate(['/forgot'])
  }

  signup(): void {
  }

  login(form: FormGroup): void {
    if(form.valid){
      const { email, password } = this.form.getRawValue();
      this._sessionService.login(email, password);
    }
    else{
      if(this.form.get('email').errors){
        this._toastr.info('Informe um email válido!');
      }
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
