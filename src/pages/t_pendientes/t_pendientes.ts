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
  selector: 't_pendientes',
  templateUrl: 't_pendientes.html'
})

export class TurnosPendientes {
  // search condition
  public t_pendientes :  TurnoPendiente;
  public t_enespera : any;
  constructor(public toastCtrl:ToastController, public Diagnostic : Diagnostic, private camera: Camera, private Servicios: Servicios, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    this.Servicios.Loading('on');
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
    });
  }

  tomarFoto(){
    this.Diagnostic.requestCameraAuthorization().then((status) => {
      if(status == this.Diagnostic.permissionStatus.GRANTED)
          this.tomarFoto2();
      else {
          // Permissions not granted
          // Therefore, create and present toast
          this.toastCtrl.create(
              {
                  message: "Debe permitir acceso a la cámara.", 
                  position: "bottom",
                  duration: 5000
              }
          ).present();
      }
    });
    this.Diagnostic.isCameraAuthorized().then((authorized) => {
      if(authorized){
        this.tomarFoto2();
        this.toastCtrl.create(
          {
              message: "Tiene accesooooo.", 
              position: "bottom",
              duration: 5000
          }
        ).present();
      }
      else {
          this.Diagnostic.requestCameraAuthorization().then((status) => {
              if(status == this.Diagnostic.permissionStatus.GRANTED)
                  this.tomarFoto2();
              else {
                  // Permissions not granted
                  // Therefore, create and present toast
                  this.toastCtrl.create(
                      {
                          message: "Debe permitir acceso a la cámara.", 
                          position: "bottom",
                          duration: 5000
                      }
                  ).present();
              }
          });
      }
    });
  }

  tomarFoto2() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType : this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  detallar(datos){
    this.nav.push(DetalleSolicitud,{datos:datos});
  }

  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }

  doRefresh(refresher){
    this.Servicios.Loading('on');
    this.Servicios.getTEnespera()
    .subscribe(data => {
      var response1 : any = data;
      this.t_enespera = JSON.parse(response1._body);
      this.Servicios.getTPendientes()
      .subscribe(data2 => {
        var response : any = data2;
          this.t_pendientes = JSON.parse(response._body);
          this.Servicios.Loading('off');
          refresher.complete();
      });
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
