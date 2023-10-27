import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit() {

  }

  get email() {
    return this.credentials ? this.credentials.get('email') : ''
  }

  get password() {
    return this.credentials ? this.credentials.get('password') : ''
  }

  async register() {
    const loading = await this.loadingController.create()
    await loading.present()

    const user = await this.authService.register(this.credentials?.value)
    await loading.dismiss()

    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true })
    } else {
      this.showAlert('Erro ao registrar', 'Por favor tente novamente!')
    }
  }

  async login() {
    const loading = await this.loadingController.create()
    await loading.present()

    const user = await this.authService.login(this.credentials?.value)
    await loading.dismiss()

    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true })
    } else {
      this.showAlert('Erro ao se conectar', 'Por favor tente novamente!')
    }
  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present()
  }


}
