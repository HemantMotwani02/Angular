import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
// import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService]
})



export class LoginComponent {

  constructor(private router: Router, private http: HttpClient) { }
  private user = inject(LoginService)


  Loginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  checkForm(item: any) {
    if (item === 'email') { console.warn("email"); }
    else { console.warn("password"); }
  }


  get email() {
    return this.Loginform.get('email');
  }

  get password() {
    return this.Loginform.get('password');
  }


  login() {
    this.user.userLogin(this.Loginform.value).subscribe({ next: (data: any) => { if (data.status === 'success') {localStorage.setItem('users',JSON.stringify(data.result)); this.router.navigate(['/Dashboard']); console.log(data.result); } else { alert("Check your credentials"); } }, error: (err) => console.log(err) });
    // this.http.post('http://127.0.0.1:7007/Login', this.Loginform.value)
  }
}
