import { Component } from '@angular/core';
import { AvatarService } from '../services/avatar/avatar.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile: any

  constructor(
    private avatar: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.avatar.getUserProfile().subscribe((data) => {
      this.profile = data
    })
  }

  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('/', { replaceUrl: true })

  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    })

    console.log(image)

    if (image) {
      const loading = await this.loadingController.create()
      await loading.present()

      const result = await this.avatar.uploadImage(image)
      loading.dismiss()

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Falha ao carregar imagem',
          message: 'Teve um problema ao carregar a imagem',
          buttons: ['OK']
        })
        await alert.present()

      }
    }


  }

}
