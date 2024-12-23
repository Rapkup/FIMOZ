import { Component } from '@angular/core';
import { Autorization } from '../../types/autorization';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  autorization: Autorization = {
    login: '',
    password: ''
  }

  constructor(private router: Router){}
  

  login(): void {
    if (this.autorization.login == "agronom")
    {
      this.router.navigate(['/agranom-page']);
    }
    else if (this.autorization.login == "zavmol")
    {
      this.router.navigate(['/zavmol'])
    }
    else if (this.autorization.login == "brigadir")
      {
        this.router.navigate(['/brigadir-page'])
      }
  } 

}
