import { Component, OnInit } from '@angular/core';

import { AlertController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [ Storage, OneSignal ]
})
export class AppComponent implements OnInit {

  public selectedIndex = 0;
  push;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Scroll',
      url: '/scroll',
      icon: 'airplane'
    },
    {
      title: 'Infinite',
      url: '/infinite',
      icon: 'airplane'
    },
    {
      title: 'Search',
      url: '/search',
      icon: 'search'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertController: AlertController,
    private oneSignal: OneSignal
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (!window.localStorage.getItem('push')) {
        this.presentAlertConfirm().then(r => {});
      } else {
        this.pushOneSignal().then(r => {});
      }
    });
  }

  ngOnInit() {
    console.log('init app');
    this.getStorage().then(r => {});
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Deseja receber notificações?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Receber',
          handler: () => {
            this.setStorage();
          }
        }
      ]
    });

    await alert.present();
  }

 async pushOneSignal() {
    await this.oneSignal.startInit('fd4b579d-7db1-4f6b-a54f-94f54412a06f', '1096998048946');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received, log
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened, log
    });

    this.oneSignal.endInit();
  }

  async getStorage() {
    await window.localStorage.getItem('push');
  }

  async setStorage() {
    await window.localStorage.setItem('push', 'ok');
  }
}
