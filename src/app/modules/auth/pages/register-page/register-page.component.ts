import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

declare var paypal: any;

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, AfterViewInit {
  errorSession: boolean = false
  formRegister: UntypedFormGroup = new UntypedFormGroup({});
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  constructor(
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router,
    private stateService: StateService
  ) { }

  ngOnInit(): void {
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
        email: new UntypedFormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new UntypedFormControl('',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
          ])
      }
    )
  }

  ngAfterViewInit(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: { order: { create: (arg0: { purchase_units: { amount: { value: string; }; }[]; }) => any; }; }) => {
        if (this.formRegister.invalid) {
          this.formRegister.markAllAsTouched();
          return;
        }
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '10.00',
            }
          }]
        });
      },
      onApprove: (data: any, actions: { order: { capture: () => Promise<any>; }; }) => {
        return actions.order.capture().then((details) => {
          this.sendLogin();
        });
      },
      onError: (err: any) => {
        this.errorSession = true
      }
    }).render('#paypal-button-container');
  }

  sendLogin(): void {
    const { nombre, apellido, email, password } = this.formRegister.value
    const body = {
      nombre,
      apellido,
      email,
      password,
    }
    this.authService.registerUser(body)
      .subscribe(responseOk => { //TODO: Cuando el usuario credenciales Correctas ✔✔
        console.log('Session iniciada correcta', responseOk);
        this.login(email, password);
      },
        err => {//TODO error 400>=
          this.errorSession = true
          console.log('⚠⚠⚠⚠Ocurrio error con tu email o password');
        })

  }

  login(email: string, password: string): void {
    this.authService.sendCredentials(email, password)
      .subscribe(responseOk => { //TODO: Cuando el usuario credenciales Correctas ✔✔
        console.log('Session iniciada correcta', responseOk);
        const { accessToken, User } = responseOk;
        this.cookie.set('token', accessToken, 4, '/');
        this.stateService.setCurrentUser(User);
        this.router.navigate(['/', 'tracks']);
      },
        err => {//TODO error 400>=
          this.errorSession = true
          console.log('⚠⚠⚠⚠Ocurrio error con tu email o password');
        })
  }

}
