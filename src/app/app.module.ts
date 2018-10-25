import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';
import { Servicios } from '../services/services'; 
import {StatusBar} from '@ionic-native/status-bar';
import { FileTransfer } from '@ionic-native/file-transfer';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';
import { OneSignal } from '@ionic-native/onesignal';
import { Diagnostic } from '@ionic-native/diagnostic';
import {ActivityService} from "../services/activity-service";
import {TripService} from "../services/trip-service";
import {WeatherProvider} from "../services/weather";
import { Chatea } from '../pages/chatea/chatea';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MyApp } from "./app.component";
import { Calendar } from '@ionic-native/calendar';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { DetalleEstablecimiento } from "../pages/detalleEstablecimiento/detalleEstablecimiento";
import {SettingsPage} from "../pages/settings/settings";
import {CheckoutTripPage} from "../pages/checkout-trip/checkout-trip";
import {TurnosPendientes} from "../pages/t_pendientes/t_pendientes";
import {Solicitar} from "../pages/solicitar/solicitar";
import { Localidad } from "../pages/localidad/localidad";
import { Clinicas } from "../pages/clinicas/clinicas";
import { Turno } from "../pages/turno/turno";
import { Especialidad } from "../pages/especialidad/especialidad";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {Filtro } from "../pages/filtro/filtro";
import {RegisterPage} from "../pages/register/register";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {TripDetailPage} from "../pages/trip-detail/trip-detail";
import {TripsPage} from "../pages/trips/trips";
import {LocalWeatherPage} from "../pages/local-weather/local-weather";
import { Camera } from '@ionic-native/camera';
import { DetalleSolicitud } from "../pages/detalle/detalle";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { NetworkConnectionProvider } from "../providers/network-connection";
import { ListaClinicas } from "../pages/listaclinicas/listaclinicas";
import { Contacto } from "../pages/contacto/contacto";
import { ListaFarmacias } from "../pages/listafarmacias/listafarmacias";
import { ListaParticulares } from "../pages/listaparticulares/listaparticulares";
import { Recomendar } from "../pages/recomendar/recomendar";
import { TurnosConfirmados } from "../pages/t_confirmados/t_confirmados";
import { Deeplinks } from "@ionic-native/deeplinks"
import { TurnosRechazados } from "../pages/t_rechazados/t_rechazados";

// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    TurnosPendientes,
    Solicitar,
    Clinicas,
    ListaParticulares,
    TurnosConfirmados,
    TurnosRechazados,
    Chatea,
    ListaFarmacias,
    Contacto,
    Turno,
    Recomendar,
    ListaClinicas,
    Localidad,
    Especialidad,
    LocalWeatherPage,
    DetalleEstablecimiento,
    NotificationsPage,
    Filtro,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    TripsPage,
    DetalleSolicitud
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    TurnosPendientes,
    Solicitar,
    Localidad,
    Recomendar,
    ListaParticulares,
    Clinicas,
    ListaFarmacias,
    ListaClinicas,
    TurnosRechazados,
    Chatea,
    Especialidad,
    Contacto,
    Turno,
    TurnosConfirmados,
    LocalWeatherPage,
    NotificationsPage,
    DetalleEstablecimiento,
    Filtro,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    TripsPage,
    DetalleSolicitud
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    Network,
    Keyboard,
    Calendar,
    Deeplinks,
    CallNumber,
    OneSignal,
    LaunchNavigator,
    FileTransfer,
    Camera,
    SocialSharing,
    Diagnostic,
    NetworkConnectionProvider,
    ActivityService,
    TripService,
    WeatherProvider,
    Servicios
  ]
})

export class AppModule {
}
