import {Component} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";

@Component({
  selector: 'filtro',
  templateUrl: 'filtro.html'
})

export class Filtro {
  constructor(public params: NavParams, public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
  accionar(data){
    this.params.get('callback')(data); 
    this.close();
  }
}
