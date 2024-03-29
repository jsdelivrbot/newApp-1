import {Component} from "@angular/core";
import {NavController, PopoverController, NavParams, LoadingController, Loading, ToastController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import { Clinicas } from "../clinicas/clinicas";
import {SearchLocationPage} from "../search-location/search-location";
import { Servicios } from '../../services/services'; 
import { TurnoPendiente } from '../../modelos/modelos';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DetalleSolicitud } from "../detalle/detalle";
import { Turno } from "../turno/turno";

@Component({
  selector: 'localidad',
  templateUrl: 'localidad.html'
})

export class Localidad {
  // search condition

  public localidades:any;
  public tipo:any;
  public localidadesFiltradas:any;
  public search:any = {LOCALIDAD:''};
  constructor(public navParams : NavParams, public toastCtrl:ToastController, public Diagnostic : Diagnostic, private camera: Camera, private Servicios: Servicios, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
    this.tipo = this.navParams.get('tipo');
  }

  ionViewWillEnter() {
    this.Servicios.Loading('on');
    this.Servicios.getLocalidades(this.navParams.get('esp'))
    .subscribe(data => {
      this.Servicios.Loading('off');
      var response1 : any = data;
      this.localidades = JSON.parse(response1._body);
      this.localidadesFiltradas = JSON.parse(response1._body);
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
        let datosIniciales = memphis.localidades;
        memphis.localidadesFiltradas = memphis.Filtrado('LOCALIDAD',datosIniciales);
    },100);
    
}

  // go to result page
  goClinicas(localidad) {
    this.nav.push(Turno,{localidad: localidad, esp: this.navParams.get('esp'), tipo: this.tipo});
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
