import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserGroup, UserInfo } from '@model/user';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss']
})
export class DialogUserComponent implements OnInit {

  public isNewUser: boolean = true;
  public title: string = 'Novo usuário';

  public form: FormGroup;

  public userGroup = UserGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly _data,
    private readonly _dialogRef: MatDialogRef<DialogUserComponent>,
    private readonly _fb: FormBuilder
  ) {  }

  ngOnInit(): void {
    
    this.form = this._fb.group({
      id: [null],
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      group: [null, [Validators.required]]
    });

    this.form.get('id').disable();
    
    if(this._data.user) {
      this._fillForm(this._data.user);
      this.title = 'Editar usuário';
      this.isNewUser = false;

      this.form.get('password').removeValidators([Validators.required]);
      this.form.get('password').updateValueAndValidity();
    }
  }

  private _fillForm(user: UserInfo): void {
    this.form.patchValue({ ...user });
  }

  public onCancel(): void {
    this._dialogRef.close();
  }

  public onSubmit(form: FormGroup): void {
    if(!form.valid){
      form.markAllAsTouched();
    }else{      
      this._dialogRef.close(form.getRawValue());
    }
  }
}
