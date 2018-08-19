import { Injectable } from '@angular/core';
import { NavController, NavOptions, AlertController, ToastController, LoadingController } from "ionic-angular";
import { Http, Headers, RequestOptions } from '@angular/http';
import * as JWT from 'jwt-decode';
import { DetalleSolicitud } from '../pages/detalle/detalle';

@Injectable()
export class Servicios {
  constructor(public loadingCtrl: LoadingController, private http: Http, public alerta: AlertController, public toastCtrl: ToastController) {
    this.path = "https://guarded-oasis-37936.herokuapp.com";
    this.HeaderGET = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('CobertecToken')});
    this.optionsGET = new RequestOptions({ headers: this.HeaderGET });
    this.HeaderPOST = new Headers({ 
      'Authorization': 'Bearer ' + localStorage.getItem('CobertecToken'),
      'Content-Type': 'application/json;charset=UTF-8'
    });
    this.optionsPOST = new RequestOptions({ headers: this.HeaderPOST });
   }
   public path : string;
   public optionsGET = new RequestOptions();
   public HeaderGET = new Headers();
   public optionsPOST = new RequestOptions();
   public HeaderPOST = new Headers();

  
  public dni = localStorage.getItem('CobertecDni');
  public loading = this.loadingCtrl.create({
    content: 'Cargando',
    spinner: 'crescent'
  });

  public flagLoad = 'off';

  foler(tipo){
    this.flagLoad = tipo;
  }
  
  Loading(tipo) {
    if(tipo == 'on'){
      this.loading = this.loadingCtrl.create({
        content: 'Cargando',
        spinner: 'crescent'
      });
      this.loading.present();
    } else {
      this.loading.dismiss();
    }
  }
  
  loginService(credenciales){

    return this.http.post(this.path + "/login", credenciales)

  }

  setLogin(token,credenciales){
    localStorage.setItem('CobertecToken', token);
    localStorage.setItem('CobertecLogueado', 'true');
    localStorage.setItem('CobertecDni', credenciales.name);
    localStorage.setItem('CobertecNafiliado', credenciales.password);
    this.path = "https://guarded-oasis-37936.herokuapp.com";
    this.HeaderGET = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('CobertecToken')});
    this.optionsGET = new RequestOptions({ headers: this.HeaderGET });
    this.HeaderPOST = new Headers({ 
      'Authorization': 'Bearer ' + localStorage.getItem('CobertecToken'),
      'Content-Type': 'application/json;charset=UTF-8'
    });
    this.optionsPOST = new RequestOptions({ headers: this.HeaderPOST });  
  }

  getTPendientes(){
    return this.http.get(this.path + "/solicitud/pendientesyabiertas/" + this.dni,  this.optionsGET);
  }

  getLocalidades(esp){
    return this.http.get(this.path + "/climedApp/localidades/" + esp,  this.optionsGET);
  }

  getEspecialidades(){
    return this.http.get(this.path + "/especialidadApp/all",  this.optionsGET);
  }

  getClinicas(localidad,esp){
    return this.http.post(this.path + "/climedApp/clinicasPorEspecialidadYLocalidad", {localidad: localidad, especialidad: esp}, this.optionsPOST);
  }

  rechazarTurno(IDS,motivo){
    return this.http.post(this.path + "/turno/rechazar", {IDSOLICITUD:IDS,motivo:motivo}, this.optionsPOST);
  }

  confirmarTurno(IDS){
    return this.http.post(this.path + "/turno/confirmar", {IDSOLICITUD:IDS}, this.optionsPOST);
  }

  EnviarSolicitud(Datos){
    return this.http.post(this.path + "/solicitud/createClinico", Datos, this.optionsPOST);
  }

  EnviarEspecialista(Datos){
    return this.http.post(this.path + "/solicitud/createEspecialidad", Datos, this.optionsPOST);
  }

  getTEnespera(){
    return this.http.get(this.path + "/solicitud/enespera/" + this.dni,  this.optionsGET);
  }

  getClinicasLista(){
    return this.http.get(this.path + "/climedApp/all",  this.optionsGET);
  }
}