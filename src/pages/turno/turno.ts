import { Component } from "@angular/core"; 
import { NavController, PopoverController, NavParams, LoadingController, Loading, ToastController, Platform } from "ionic-angular"; 
import { Storage } from '@ionic/storage'; 
import { Diagnostic } from '@ionic-native/diagnostic';
import { NotificationsPage } from "../notifications/notifications"; 
import { SettingsPage } from "../settings/settings"; 
import { SearchLocationPage } from "../search-location/search-location"; 
import { Servicios } from '../../services/services'; 
import { TurnoPendiente } from '../../modelos/modelos'; 
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera'; 
import { DetalleSolicitud } from "../detalle/detalle"; 
import { TurnosPendientes } from "../t_pendientes/t_pendientes";

@Component({
  selector: 'turno',
  templateUrl: 'turno.html'
})

export class Turno {
  // search condition

  public Clinica: any;
  public tipo: any;
  public base64image:any = undefined;
  public Especialidad: any;
  public sugerido: any;
  constructor(public plt: Platform, private transfer: FileTransfer, public navParams: NavParams, public toastCtrl: ToastController, public Diagnostic: Diagnostic, public camera: Camera, private Servicios: Servicios, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
    this.Clinica = this.navParams.get('clinica');
    this.Especialidad = this.navParams.get('esp');
    this.tipo = this.navParams.get('tipo');
  }
  public fileTransfer: FileTransferObject = this.transfer.create();

  ionViewWillEnter() {

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

  EnviarSolicitud() {
    let datos = {
      IDCLIMED: this.Clinica.IDCLI,
      DNISOLICITANTE: localStorage.getItem('CobertecDni'),
      IDAFILIADO: localStorage.getItem('CobertecNafiliado'),
      MEDICO: this.sugerido,
      ESPECIALIDAD: this.navParams.get('esp')
    };
    this.Servicios.Loading('on');
    this.Servicios.EnviarSolicitud(datos)
      .subscribe(
        res => {
          this.Servicios.Loading('off');
          this.nav.push(TurnosPendientes);
          let toast = this.toastCtrl.create({
            message: 'La solicitud ha sido enviada. A la brevedad le enviaremos un turno.',
            duration: 5000,
            position: 'middle',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          toast.present();
        },
        err => {
          alert('error');
        }
      );
    //{'IDCLIMED':clinica,'DNISOLICITANTE':dni,'IDAFILIADO':carnet,'MEDICO':sugerido,'ESPECIALIDAD':40}
  }

  EnviarEspecialista(){
    this.Servicios.Loading('on');
    let d = new Date();
    let tiempo = d.getTime();
    let fileNameInicial = tiempo.toString() + '.jpg';
    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: fileNameInicial,
      chunkedMode: false,
      mimeType: "image/jpg",
      params: {'directory':'certificados', 'fileName':fileNameInicial}
    };
 
   this.fileTransfer.upload(this.base64image, "http://www.gestionarturnos.com/upload.php", options, true)
    .then((data) => {
      let datos = {
        IDCLIMED: this.Clinica.IDCLI,
        DNISOLICITANTE: localStorage.getItem('CobertecDni'),
        IDAFILIADO: localStorage.getItem('CobertecNafiliado'),
        MEDICO: this.sugerido,
        ESPECIALIDAD: this.navParams.get('esp'),
        FOTO: fileNameInicial
      };
      this.Servicios.EnviarEspecialista(datos)
      .subscribe(
        res => {
          this.Servicios.Loading('off');
          this.nav.push(TurnosPendientes);
          let toast = this.toastCtrl.create({
            message: 'La solicitud ha sido enviada. A la brevedad le enviaremos un turno.',
            duration: 5000,
            position: 'middle',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          toast.present();
        },
        err => {
          alert('error');
        }
      );
    }, (err) => {
      this.Servicios.Loading('off');
      this.toastCtrl.create({
        message: 'Ocurrió un error al subir la imágen.',
        duration: 5000,
        position: 'bottom',
        cssClass: 'danger',
        closeButtonText: 'OK',
        showCloseButton: true
      }).present();
    })
  }




  EnviarEsutdio(){
    this.Servicios.Loading('on');
    let d = new Date();
    let tiempo = d.getTime();
    let fileNameInicial = tiempo.toString() + '.jpg';
    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: fileNameInicial,
      chunkedMode: false,
      mimeType: "image/jpg",
      params: {'directory':'certificados', 'fileName':fileNameInicial}
    };
 
   this.fileTransfer.upload(this.base64image, "http://www.gestionarturnos.com/upload.php", options, true)
    .then((data) => {
      let datos = {
        DNISOLICITANTE: localStorage.getItem('CobertecDni'),
        IDAFILIADO: localStorage.getItem('CobertecNafiliado'),
        MEDICO: this.sugerido,
        FOTO: fileNameInicial
      };
      this.Servicios.EnviarEstudio(datos)
      .subscribe(
        res => {
          this.Servicios.Loading('off');
          this.nav.push(TurnosPendientes);
          let toast = this.toastCtrl.create({
            message: 'La solicitud ha sido enviada. A la brevedad le enviaremos un turno.',
            duration: 5000,
            position: 'middle',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          toast.present();
        },
        err => {
          alert('error');
        }
      );
    }, (err) => {
      this.Servicios.Loading('off');
      this.toastCtrl.create({
        message: 'Ocurrió un error al subir la imágen.',
        duration: 5000,
        position: 'bottom',
        cssClass: 'danger',
        closeButtonText: 'OK',
        showCloseButton: true
      }).present();
    }) 
  }




  TomarFoto() {
    if(this.plt.is('ios')){
      this.SeleccionarFoto();
    }else{
      this.Diagnostic.requestCameraAuthorization().then((status) => {
        if (status == this.Diagnostic.permissionStatus.GRANTED)
          this.tomarFoto2();
        else {
          this.Diagnostic.isCameraAuthorized().then((authorized) => {
            if (authorized) {
              this.tomarFoto2();
            } else {
              this.Diagnostic.requestCameraAuthorization().then((status) => {
                if (status == this.Diagnostic.permissionStatus.GRANTED)
                  this.tomarFoto2();
                else {
                  // Permissions not granted
                  // Therefore, create and present toast
                  this.toastCtrl.create({
                    message: "Debe permitir acceso a la cámara.",
                    position: "bottom",
                    duration: 5000
                  }).present();
                }
              });
            }
          });
        }
      });
    }
  }

  tomarFoto2() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  SeleccionarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

}

//
