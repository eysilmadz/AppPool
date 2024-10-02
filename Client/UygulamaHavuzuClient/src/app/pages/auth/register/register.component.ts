import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  loginFormGroup!: FormGroup;
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  // Formu kaydetme backende gönderme işlemleri
  onSave(): void {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched(); 
      return;
    }
    
    const user: User = {
      userName: this.loginFormGroup.get('userName')?.value,
      email: this.loginFormGroup.get('email')?.value,
      password: this.loginFormGroup.get('password')?.value
    };

   // UserService'i kullanarak kullanıcıyı backend'e post ediyoruz
   this.userService.postUser(user).subscribe({
    next: (response) => {
      console.log('Kullanıcı başarıyla kaydedildi:', response);
      this.router.navigate(['/login']);  // Kayıt sonrası yönlendirme
    },
    error: (error) => {
      console.error('Kullanıcı kaydedilirken hata oluştu:', error);
    }
  });

  }

  getEmailErrorMessage(): string {
    const emailControl = this.loginFormGroup.get('email');
    if (emailControl!.hasError('required')) {
      return 'Email is required.';
    }
    if (emailControl!.hasError('email')) {
      return 'Enter a valid email address.';
    }
    return '';
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
