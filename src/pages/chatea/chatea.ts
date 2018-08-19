import {Component} from "@angular/core";
import {NavController, PopoverController, LoadingController, Loading, ToastController, Platform, AlertController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import { TripsPage } from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";
import { Servicios } from '../../services/services'; 
import { TurnoPendiente } from '../../modelos/modelos';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DetalleSolicitud } from "../detalle/detalle";

@Component({
  selector: 'chatea',
  templateUrl: 'chatea.html'
})

export class Chatea {
  // search condition
  public t_pendientes :  TurnoPendiente;
  public t_enespera : any;
  constructor(public toastCtrl:ToastController, public Diagnostic : Diagnostic, private camera: Camera, private Servicios: Servicios, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {

  }
}

//
