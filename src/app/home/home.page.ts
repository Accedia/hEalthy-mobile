import { Component } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType, MediaType, EncodingType, DestinationType } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { SubstancesService } from '../substances/substances.service';
import { ActionSheetOptions, ActionSheet } from '@ionic-native/action-sheet/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';

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
    private actionSheet: ActionSheet,
    private crop: Crop,
    private file: File
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
      destinationType: DestinationType.FILE_URL,
      encodingType: EncodingType.JPEG,
      mediaType: MediaType.PICTURE,
      sourceType,
      correctOrientation: true
    };

    try {
      const rawImage = await this.camera.getPicture(options);
      const cropped = await this.crop.crop(rawImage, { quality: 100, targetWidth: -1, targetHeight: -1 });
      const croppedBase64 = await this.croppedToBase64(cropped);

      this.substancesService.substanceBase64Image = croppedBase64;
      this.loading = true;
      this.navigateToSubstancesPage();
    } catch (error) {
      console.error(JSON.stringify(error));
    } finally {
      this.loading = false;
    }
  }

  private croppedToBase64(fileUrl: string): Promise<string> {
    const rawUrl = fileUrl.split('?')[0];
    const splitPath = rawUrl.split('/');
    const imageName = splitPath[splitPath.length - 1];
    const filePath = rawUrl.split(imageName)[0];

    return this.file.readAsDataURL(filePath, imageName);
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
