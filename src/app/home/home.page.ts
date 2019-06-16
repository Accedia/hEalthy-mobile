import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { SubstancesService } from '../substances/substances.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private loading = false;
  private searchString = '';

  constructor(
    private camera: Camera,
    private router: Router,
    private substancesService: SubstancesService
  ) {}

  public async openCamera() {
    if (this.loading) {
      return;
    }

    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    try {
      this.substancesService.substanceBase64Image = await this.camera.getPicture(options);
      this.loading = true;
      this.navigateToSubstancesPage();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  private navigateToSubstancesPage() {
    this.router.navigate(['/substances'], {
      queryParams: {
        imageBase64: ''
      }
    });
  }

  public navigateToSearch() {
    this.router.navigate(['/substances'], {
      queryParams: {
        substance: this.searchString
      }
    });
  }

}
