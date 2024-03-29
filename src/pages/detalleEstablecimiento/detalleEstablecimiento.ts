import {Component} from "@angular/core";
import {NavController, NavParams, AlertController, ToastController} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {TripDetailPage} from "../trip-detail/trip-detail";
import { Servicios } from '../../services/services'; 

import { LaunchNavigator, LaunchNavigatorOptions } from "@ionic-native/launch-navigator";
@Component({
  selector: 'detalleEstablecimiento',
  templateUrl: 'detalleEstablecimiento.html'
})
export class DetalleEstablecimiento {
  // list of trips
  public trips: any;
  constructor(private launchNavigator: LaunchNavigator, public alerta:AlertController, public toastCtrl:ToastController, public nav: NavController, public params: NavParams, public tripService: TripService, private Servicios: Servicios) {
    // set sample data
    this.trips = tripService.getAll();
    this.datos = this.params.get('clinica');
    this.farmacia = this.params.get('farmacia');
  }
  public datos;
  public farmacia;
  htmlElement = document.getElementById('map');
  // view trip detail
  launch(){
    let options: LaunchNavigatorOptions = {
    };
    
    this.launchNavigator.navigate(''+this.datos.latitude+','+this.datos.longitude, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

}
