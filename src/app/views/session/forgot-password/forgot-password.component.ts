import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  emailSended: boolean;
  loading: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
    })
  }

  send(form: FormGroup): void {
    if(form.valid){
      setTimeout(() => {
        this.loading = false
        this.emailSended = true;
      }, 1000);
      this.loading = true

    }
  }
  
  cancel(){
    window.history.back();
  }

  goLogin(){
    this.route.navigate(['/login'])
  }

}
