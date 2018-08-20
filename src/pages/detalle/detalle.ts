import {Component} from "@angular/core";
import {NavController, NavParams, AlertController, ToastController} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {TripDetailPage} from "../trip-detail/trip-detail";
import { Servicios } from '../../services/services'; 
import { Calendar } from '@ionic-native/calendar';


@Component({
  selector: 'detalleSolicitud',
  templateUrl: 'detalle.html'
})
export class DetalleSolicitud {
  // list of trips
  public trips: any;

  constructor(private calendar: Calendar, public alerta:AlertController, public toastCtrl:ToastController, public nav: NavController, public params: NavParams, public tripService: TripService, private Servicios: Servicios) {
    // set sample data
    this.trips = tripService.getAll();
    this.datos = this.params.get('datos');
    this.tipo = this.params.get('tipo');
  }
  public datos;
  public tipo;
  // view trip detail

  rechazarT(IDS) {
    this.AlertarRechazoT(IDS);
    
  }
  viewDetail(id) {
    this.nav.push(TripDetailPage, {id: id});
  }

  guardarCalendario(){
    if(this.calendar.hasWritePermission()){
      let startDateString = this.datos.FECHAT + "T" + this.datos.HORAT;
      let startDate = new Date(startDateString);
      let endDateString = this.datos.FECHAT + "T" + this.datos.HORAT;
      let endDate = new Date(endDateString);
      this.calendar.createEventInteractively('Turno en ' + this.datos.CLINICA, this.datos.DIRECCION, 'Médico asignado: ' + this.datos.MEDICOASIGNADO, startDate, endDate).then( data => {
        let toast = this.toastCtrl.create({
          message: '¡El turno ha sido añadido al clanedario!',
          duration: 5000,
          position: 'middle',
          cssClass: 'dark-trans',
          closeButtonText: 'OK',
          showCloseButton: true
        });
        toast.present();
      })
    } else {
      let toast = this.toastCtrl.create({
        message: 'Debe permitir el acceso al calendario.',
        duration: 5000,
        position: 'middle',
        cssClass: 'dark-trans',
        closeButtonText: 'OK',
        showCloseButton: true
      });
      toast.present();
    }
  }

  confirmarT(IDS){
    this.Servicios.foler('on');
    this.Servicios.confirmarTurno(IDS)
    .subscribe(
      res => {
        this.Servicios.foler('off');
        this.nav.pop();
        let toast = this.toastCtrl.create({
          message: 'El turno ha sido confirmado.',
          duration: 5000,
          position: 'middle',
          cssClass: 'dark-trans',
          closeButtonText: 'OK',
          showCloseButton: true
        });
        toast.present();
      },
      err => {
        this.Servicios.foler('off');
        alert('error');
      }
    );
  }

  AlertarRechazoT(IDS) {
    let alerta = this.alerta.create({
      title: 'Rechazar Turno',
      message: "Ingrese el motivo por el cual desea rechazar el turno.",
      inputs: [
        {
          name: 'motivo',
          id: 'autofocu',
          placeholder: 'Motivo..',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Rechazar',
          handler: data => {
            this.Servicios.foler('on');
            this.Servicios.rechazarTurno(IDS,data.motivo)
            .subscribe(
              res => {
                this.Servicios.foler('off');
                this.nav.pop();
                let toast = this.toastCtrl.create({
                  message: 'El turno ha sido rechazado correctamente. Le enviaremos uno nuevo a la brevedad.',
                  duration: 5000,
                  position: 'middle',
                  cssClass: 'dark-trans',
                  closeButtonText: 'OK',
                  showCloseButton: true
                });
                toast.present();
              },
              err => {
                this.Servicios.foler('off');
                alert('error');
              }
            );
            
          }
        }
      ]
    });
    alerta.present()
    .then(() => {
      document.getElementById('autofocu').focus();
    })
  }
}
