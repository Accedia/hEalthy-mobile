import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private isConnectedToInternet = true;
  private noInternetConnectionAlert: HTMLIonAlertElement = null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: Network,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.network.type === this.network.Connection.NONE) {
        this.isConnectedToInternet = false;
        this.showNoInternetConnectionAlert();
      }

      // Network checks
      this.network.onConnect().subscribe(() => {
        console.log('connected');
        this.isConnectedToInternet = true;
        this.hideNoInternetConnectionAlert();
      });

      this.network.onDisconnect().subscribe(() => {
        console.log('not connected');
        this.isConnectedToInternet = false;
        this.showNoInternetConnectionAlert();
      });
    });
  }

  private async showNoInternetConnectionAlert() {
    if (this.noInternetConnectionAlert !== null) {
      return;
    }

    this.noInternetConnectionAlert = await this.alertController.create({
      message: 'You must be connected to the internet if you want to use this application.',
      backdropDismiss: false
    });

    return await this.noInternetConnectionAlert.present();
  }

  private async hideNoInternetConnectionAlert() {
    if (this.noInternetConnectionAlert === null) {
      return;
    }

    await this.noInternetConnectionAlert.dismiss();
    this.noInternetConnectionAlert = null;
  }
}
