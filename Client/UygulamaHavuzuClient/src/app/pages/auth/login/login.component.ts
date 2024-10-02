import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../entities/user';
import { TokenService } from '../../../services/token.service';
import { response } from 'express';
import { error } from 'console';
import { UserService } from '../../../services/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  token: string = '';
  userId: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  async onLogin(): Promise<void> {
    if (this.loginFormGroup.valid) {
      const loginData = this.loginFormGroup.value;
      console.log("Data: ", loginData);
      
      //userService ile giriş yapma isteği gönderiliyor
      this.userService.loginUser(loginData).subscribe({
        next: (response) => {
          console.log("response: ", response);
          if (response && response.token) {
            // Token'ı TokenService ile saklama
            this.tokenService.setToken(response.token);

            try {
              // Token'ı decode etme
              const decodedToken: LoginComponent = jwtDecode(response.token);
              console.log('Decoded Token:', decodedToken); // Token içeriğini kontrol edin

              if (decodedToken.userId) {
                localStorage.setItem('userId', decodedToken.userId);
              } else {
                console.error('userId bulunamadı. Token içeriğini kontrol edin.');
              }


            } catch (error) {
              console.error('Token decode hatası: ', error);
            }

            //Başarılı giriş sonrası yönlendirme
            this.router.navigate(['/layout']);
          } else {
            console.error('Token alınamadı. Lütfen tekrar deneyin.');
          }
        },
        error: (error) => {
          console.error('Giriş Hatası: ', error);
        }
      });
    } else {
      this.loginFormGroup.markAllAsTouched();
    }
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginFormGroup.get('password');
    if (passwordControl!.hasError('required')) {
      return 'Password is required.';
    }
    if (passwordControl!.hasError('minlength')) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  }
}
