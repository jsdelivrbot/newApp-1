import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { TurnosPendientes } from "../pages/t_pendientes/t_pendientes";
import { ListaClinicas } from "../pages/listaclinicas/listaclinicas";
import { Solicitar } from "../pages/solicitar/solicitar";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import { Chatea } from "../pages/chatea/chatea";
import { Contacto } from "../pages/contacto/contacto";
import { ListaFarmacias } from "../pages/listafarmacias/listafarmacias";
import { ListaParticulares } from "../pages/listaparticulares/listaparticulares";
import { Recomendar } from "../pages/recomendar/recomendar";
import { TurnosConfirmados } from "../pages/t_confirmados/t_confirmados";

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = localStorage.getItem('CobertecLogueado') == 'true' ? Solicitar : LoginPage;

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'}
    ];
  }

  public nafiliado = localStorage.getItem('CobertecNafiliado');

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page == 'Solicitar') {
      this.nav.setRoot(Solicitar);
    }
    if(page == 'Chatea'){
      this.nav.push(Chatea)
    }
    if(page == 'TurnosPendientes') {
      this.nav.setRoot(TurnosPendientes);
    }
    if(page == 'listaClinicas') {
      this.nav.setRoot(ListaClinicas);
    }
    if(page == 'listaFarmacias') {
      this.nav.setRoot(ListaFarmacias);
    }
    if(page == 'listaParticulares') {
      this.nav.setRoot(ListaParticulares);
    }
    if(page == 'TurnosConfirmados') {
      this.nav.setRoot(TurnosConfirmados);
    }
    if(page == 'Recomendar') {
      this.nav.setRoot(Recomendar);
    }
    if(page == 'Contacto') {
      this.nav.setRoot(Contacto);
    }
  }

  logout() {
    localStorage.setItem('CobertecLogueado', 'false');
    this.nav.setRoot(LoginPage);
  }

}
