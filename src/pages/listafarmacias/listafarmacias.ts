import {Component, ViewChild, ElementRef} from "@angular/core";
import {NavController, PopoverController, NavParams, LoadingController, Loading, ToastController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';

import {Filtro} from "../filtro/filtro";
import {SettingsPage} from "../settings/settings";
import {SearchLocationPage} from "../search-location/search-location";
import { DetalleEstablecimiento } from '../detalleEstablecimiento/detalleEstablecimiento'; 
import { Servicios } from '../../services/services'; 
import { TurnoPendiente } from '../../modelos/modelos';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DetalleSolicitud } from "../detalle/detalle";

@Component({
  selector: 'listafarmacias',
  templateUrl: 'listafarmacias.html'
})

export class ListaFarmacias {
  // search condition
  public clinicas:any;
  public tipo:any;
  public pet: any;
  public flagVisible:any;
  public clinicasFiltradas:any;
  public search:any = {LOCALIDAD:''};
  public localidades: Array<any> = ['',''];
  constructor(public navParams : NavParams, public toastCtrl:ToastController, public Diagnostic : Diagnostic, private camera: Camera, private Servicios: Servicios, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
    this.tipo = this.navParams.get('tipo');
  }

  ionViewWillEnter() {
    this.Servicios.Loading('on');
    this.Servicios.getFarmaciasLista()
    .subscribe(data => {
      var response1 : any = data;
      this.mapearLocalidades(JSON.parse(response1._body));
      this.Servicios.Loading('off');
      this.clinicas = JSON.parse(response1._body);
      this.clinicasFiltradas = JSON.parse(response1._body);
    });
  }

  Filtrado(columna,datitos) : Array<any>{
    return datitos.filter(item => {
        let notMatchingField = Object.keys(this.search[columna])
            .find(key => !item[columna].toUpperCase().includes(this.search[columna].toUpperCase()) );

        return !notMatchingField; // true if matches all fields
    });
}

Filtrar(campo){
    var memphis = this;
    setTimeout(function(){
        let datosIniciales = memphis.clinicas;
        memphis.clinicasFiltradas = memphis.Filtrado(campo,datosIniciales);
    },100);
}

  // go to result page
  goDetalle(x) {
    this.nav.push(DetalleEstablecimiento, {clinica: x, farmacia: true});
  }

  mapearLocalidades(array){
    var i, j;
    var flag:boolean;
    this.localidades = [];
    for(i = 0;i < array.length;i++){
      flag = false;
      for(j = 0;j < this.localidades.length;j++){
        if(this.localidades[j] == array[i].LOCALIDAD){
          flag = true;
        }
      }
      if(!flag){ this.localidades.push(array[i].LOCALIDAD) }
    }
  }

  // to go account page
  goToAccount() {
    this.nav.setRoot(SettingsPage);
  }

  presentNotifications(myEvent) {
    let popoverData = {
      callback: (data) => {
        if(data == 'LOCALIDAD') {
          this.search.NOMBRE = '';
          this.Filtrar('NOMBRE');
          document.getElementById('LocalidadF').click();
          this.flagVisible = false;
        }
        if(data == 'NOMBRE') {
          this.search.LOCALIDAD = '';
          this.Filtrar('LOCALIDAD');
          this.flagVisible = true;
        }
      }
    }
    let popover = this.popoverCtrl.create(Filtro, popoverData);
    popover.present({
      ev: myEvent
    });
  }

  

}

//
