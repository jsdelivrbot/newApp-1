import {Component, ViewChild, ElementRef} from "@angular/core";
import {NavController, PopoverController, NavParams, LoadingController, Loading, ToastController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SocialSharing } from '@ionic-native/social-sharing'
import {Filtro} from "../filtro/filtro";
import {SettingsPage} from "../settings/settings";
import {SearchLocationPage} from "../search-location/search-location";
import { DetalleEstablecimiento } from '../detalleEstablecimiento/detalleEstablecimiento'; 
import { Servicios } from '../../services/services'; 
import { TurnoPendiente } from '../../modelos/modelos';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DetalleSolicitud } from "../detalle/detalle";

@Component({
  selector: 'recomendar',
  templateUrl: 'recomendar.html'
})

export class Recomendar {
  // search condition

  constructor(private socialSharing: SocialSharing, public navParams : NavParams, public toastCtrl:ToastController, public Diagnostic : Diagnostic, private camera: Camera, private Servicios: Servicios, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
    
  }

  ionViewWillEnter() {
    
  }

  Share(){
    this.socialSharing.shareViaWhatsApp('¡Unete a Cobertec! Toda la información y detalles en: http://www.cobertec.com.ar | Descarga la aplicaión: ', '', 'https://play.google.com/store/apps/details?id=com.vadiun.cobertec&hl=es')
  }

  // to go account page
  goToAccount() {
    this.nav.setRoot(SettingsPage);
  }

}

//
