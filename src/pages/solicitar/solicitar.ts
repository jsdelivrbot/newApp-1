import {Component} from "@angular/core";
import {NavController, PopoverController, LoadingController, Loading, ToastController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import { Localidad } from "../localidad/localidad";
import { Especialidad } from "../especialidad/especialidad";
import {SearchLocationPage} from "../search-location/search-location";
import { Servicios } from '../../services/services'; 
import { TurnoPendiente } from '../../modelos/modelos';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DetalleSolicitud } from "../detalle/detalle";
import { Turno } from "../turno/turno";

@Component({
  selector: 'solicitar',
  templateUrl: 'solicitar.html'
})

export class Solicitar {
  // search condition
  public t_pendientes :  TurnoPendiente;
  public t_enespera : any;

  constructor(public toastCtrl:ToastController, public Diagnostic : Diagnostic, private camera: Camera, private Servicios: Servicios, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
/*     this.Servicios.Loading('on');
    this.Servicios.getTEnespera()
    .subscribe(data => {
      var response1 : any = data;
      this.t_enespera = JSON.parse(response1._body);
      this.Servicios.getTPendientes()
      .subscribe(data2 => {
        var response : any = data2;
          this.t_pendientes = JSON.parse(response._body);
          this.Servicios.Loading('off');
      });
    }); */
  }
  // go to result page
  popup(tipo) {
    if(tipo == 'clinico'){
      this.nav.push(Localidad, {esp:'40', tipo: tipo});
    }
    if(tipo == 'especialista'){
      this.nav.push(Especialidad, {tipo: tipo});
    }
    if(tipo == 'estudio'){
      this.nav.push(Turno, {tipo: tipo});
    }
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
