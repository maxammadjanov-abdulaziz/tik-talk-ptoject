import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { from, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authservice = inject(AuthService)
  router = inject(Router)

  isPasswordVisible = signal<boolean>(false)

  form = new FormGroup({
    username: new FormControl<string | null>(null),
    password: new FormControl<string | null>(null)
  });

  onSubmit() {
    if (this.form.valid) {
      //@ts-ignore
      this.authservice.login(this.form.value).subscribe(res => {
        this.router.navigate([''])
        console.log(res);

      })

    }

  }
}
