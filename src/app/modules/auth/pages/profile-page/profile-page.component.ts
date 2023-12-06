import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '@modules/auth/interfaces/auth.interface';
import { AuthService } from '@modules/auth/services/auth.service';
import { UserService } from '@modules/dashboard/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  errorSession: boolean = false
  formRegister: UntypedFormGroup = new UntypedFormGroup({});
  user!: IUser;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private stateService: StateService
  ) { }

  async ngOnInit(): Promise<void> {
    this.formRegister = new UntypedFormGroup(
      {
        nombre: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]),
        apellido: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]),
        password: new UntypedFormControl('',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
          ])
      })

    this.user = await this.userService.getUserAuth().toPromise();
    this.formRegister.patchValue(this.user);
  }

  sendLogin(): void {
    const { nombre, apellido, password } = this.formRegister.value
    const body = {
      nombre,
      apellido,
      password,
    }
    this.userService.updateUser(this.user.id, body)
      .subscribe(responseOk => { //TODO: Cuando el usuario credenciales Correctas ✔✔
        this.stateService.setCurrentUser(responseOk);
        this.router.navigate(['/dashboard']);
      },
        err => {//TODO error 400>=
          this.errorSession = true
          console.log('⚠⚠⚠⚠Ocurrio error con tu email o password');
        })

  }
}


















