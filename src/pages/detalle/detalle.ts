import {Component} from "@angular/core";
import {NavController, NavParams, AlertController, ToastController} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {TripDetailPage} from "../trip-detail/trip-detail";
import { Servicios } from '../../services/services'; 

@Component({
  selector: 'detalleSolicitud',
  templateUrl: 'detalle.html'
})
export class DetalleSolicitud {
  // list of trips
  public trips: any;

  constructor(public alerta:AlertController, public toastCtrl:ToastController, public nav: NavController, public params: NavParams, public tripService: TripService, private Servicios: Servicios) {
    // set sample data
    this.trips = tripService.getAll();
    this.datos = this.params.get('datos');
  }
  public datos;
  // view trip detail

  rechazarT(IDS) {
    this.AlertarRechazoT(IDS);
    
  }
  viewDetail(id) {
    this.nav.push(TripDetailPage, {id: id});
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
