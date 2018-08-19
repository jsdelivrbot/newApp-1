import {Component} from "@angular/core";
import {NavController, PopoverController, NavParams, LoadingController, Loading, ToastController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {SearchLocationPage} from "../search-location/search-location";
import { Turno } from '../turno/turno'; 
import { Servicios } from '../../services/services'; 
import { TurnoPendiente } from '../../modelos/modelos';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DetalleSolicitud } from "../detalle/detalle";

@Component({
  selector: 'clinicas',
  templateUrl: 'clinicas.html'
})

export class Clinicas {
  // search condition

  public clinicas:any;
  public tipo:any;
  public clinicasFiltradas:any;
  public search:any = {LOCALIDAD:''};
  constructor(public navParams : NavParams, public toastCtrl:ToastController, public Diagnostic : Diagnostic, private camera: Camera, private Servicios: Servicios, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
    this.tipo = this.navParams.get('tipo');
  }

  ionViewWillEnter() {
    this.Servicios.Loading('on');
    this.Servicios.getClinicas(this.navParams.get('localidad'),this.navParams.get('esp'))
    .subscribe(data => {
      this.Servicios.Loading('off');
      var response1 : any = data;
      this.clinicas = JSON.parse(response1._body);
      this.clinicasFiltradas = JSON.parse(response1._body);
    });
  }

  Filtrado(columna,datitos) : Array<any>{
    return datitos.filter(item => {
        let notMatchingField = Object.keys(this.search[columna])
            .find(key => !item[columna].includes(this.search[columna]));

        return !notMatchingField; // true if matches all fields
    });
}

Filtrar(){
    var memphis = this;
    setTimeout(function(){
        let datosIniciales = memphis.clinicas;
        memphis.clinicasFiltradas = memphis.Filtrado('NOMBRE',datosIniciales);
    },100);
    
}

  // go to result page
  goTurno(x) {
    this.nav.push(Turno, {clinica: x, esp: this.navParams.get('esp'), tipo: this.tipo});
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
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
