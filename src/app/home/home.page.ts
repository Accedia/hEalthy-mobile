import { Component } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType, MediaType, EncodingType, DestinationType } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { SubstancesService } from '../substances/substances.service';
import { ActionSheetOptions, ActionSheet } from '@ionic-native/action-sheet/ngx';

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
    private substancesService: SubstancesService,
    private actionSheet: ActionSheet
  ) {}

  public openSourceTypeActionSheet() {
    const actionSheetOptions: ActionSheetOptions = {
      title: 'Choose',
      buttonLabels: ['Camera', 'Gallery'],
      addCancelButtonWithLabel: 'Cancel',
    };

    this.actionSheet.show(actionSheetOptions).then((buttonIndex: number) => {
      if (buttonIndex === 1) {
        this.openCamera(PictureSourceType.CAMERA);
      } else if (buttonIndex === 2) {
        this.openCamera(PictureSourceType.PHOTOLIBRARY);
      }
    });
  }

  private async openCamera(sourceType: PictureSourceType) {
    if (this.loading) {
      return;
    }

    const options: CameraOptions = {
      quality: 100,
      destinationType: DestinationType.DATA_URL,
      encodingType: EncodingType.JPEG,
      mediaType: MediaType.PICTURE,
      sourceType,
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
