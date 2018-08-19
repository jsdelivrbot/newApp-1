import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { CallNumber } from '@ionic-native/call-number';


@Component({
  selector: 'page-contacto',
  templateUrl: 'contacto.html'
})

export class Contacto {
  // search condition

  constructor(private launchNavigator: LaunchNavigator, private callNumber: CallNumber, public nav: NavController, public popoverCtrl: PopoverController) {
  }

  call(numero){
    this.callNumber.callNumber('46376607', false)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";

  }

  launch(){
    let options: LaunchNavigatorOptions = {
    };
    
    this.launchNavigator.navigate('Sarmiento 640, Buenos Aires', options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  mailto(){
    window.open('mailto:info@cobertec.com.ar', '_system');
    console.log('hola');
  }


}

//
