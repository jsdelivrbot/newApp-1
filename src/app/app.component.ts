import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { OneSignal } from '@ionic-native/onesignal';
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
import { Deeplinks } from "@ionic-native/deeplinks";
import { TurnosRechazados } from "../pages/t_rechazados/t_rechazados";

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
  constructor(private deeplinks: Deeplinks, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public keyboard: Keyboard, private oneSignal: OneSignal) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'}
    ];
  }

  public nafiliado = localStorage.getItem('CobertecNafiliado');
  public NombreAfiliado = localStorage.getItem('CobertecNombreAfiliado');
  

  AfterViewInit(){
    this.deeplinks.routeWithNavController(this.nav, {
      '/confirmados': TurnosConfirmados
    }).subscribe(match => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        alert('matched')
      }, nomatch => {
        
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      this.deeplinks.routeWithNavController(this.nav, {
        '/confirmados': TurnosConfirmados
      }).subscribe(match => {
          // match.$route - the route we matched, which is the matched entry from the arguments to route()
          // match.$args - the args passed in the link
          // match.$link - the full link data
          this.nav.setRoot(TurnosPendientes);
        }, nomatch => {

        });


      // OneSignal Code start:
    // Enable to debug issues:
    // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});



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
    if(page == 'TurnosRechazados') {
      this.nav.setRoot(TurnosRechazados);
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
