import {Component} from "@angular/core";
import {NavController, PopoverController, NavParams, LoadingController, Loading, ToastController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import { Localidad } from "../localidad/localidad";
import {SearchLocationPage} from "../search-location/search-location";
import { Servicios } from '../../services/services'; 
import { TurnoPendiente } from '../../modelos/modelos';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DetalleSolicitud } from "../detalle/detalle";

@Component({
  selector: 'especialidad',
  templateUrl: 'especialidad.html'
})

export class Especialidad {
  // search condition

  public tipo:any;
  public especialidades:any;
  public especialidadesFiltradas:any;
  public search:any = {LOCALIDAD:''};
  constructor(public navParams : NavParams, public toastCtrl:ToastController, public Diagnostic : Diagnostic, private camera: Camera, private Servicios: Servicios, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
    this.tipo = this.navParams.get('tipo');
  }

  ionViewWillEnter() {
    this.Servicios.Loading('on');
    if(this.tipo == 'accesoDirecto'){
      this.Servicios.getEspecialidadesAccesoDirecto()
        .subscribe(data => {
          this.Servicios.Loading('off');
          var response1: any = data;
          this.especialidades = JSON.parse(response1._body);
          this.especialidadesFiltradas = JSON.parse(response1._body);
        });
    }else{
      this.Servicios.getEspecialidades()
      .subscribe(data => {
        this.Servicios.Loading('off');
        var response1 : any = data;
        this.especialidades = JSON.parse(response1._body);
        this.especialidadesFiltradas = JSON.parse(response1._body);
      });
    }
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
        let datosIniciales = memphis.especialidades;
        memphis.especialidadesFiltradas = memphis.Filtrado('NOMBRE',datosIniciales);
    },100);
    
}

  // go to result page
  goLocalidad(esp) {
    this.nav.push(Localidad, {esp:esp, tipo: this.tipo});
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
