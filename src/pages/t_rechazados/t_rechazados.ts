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
  selector: 't_rechazados',
  templateUrl: 't_rechazados.html'
})

export class TurnosRechazados {
  // search condition
  public t_confirmados :  TurnoPendiente;
  constructor(public toastCtrl:ToastController, public Diagnostic : Diagnostic, private camera: Camera, private Servicios: Servicios, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    this.Servicios.Loading('on');
    this.Servicios.getTRechazados()
    .subscribe(data => {
      var response1 : any = data;
      this.t_confirmados = JSON.parse(response1._body);
      this.Servicios.Loading('off');
    });
  }

  detallar(datos){
    this.nav.push(DetalleSolicitud,{datos:datos, tipo:'rechazado'});
  }

  

  doRefresh(refresher){
    this.Servicios.Loading('on');
    this.Servicios.getTConfirmados()
    .subscribe(data => {
      refresher.complete();
      var response1 : any = data;
      this.t_confirmados = JSON.parse(response1._body);
      this.Servicios.Loading('off');
    });
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}

//
