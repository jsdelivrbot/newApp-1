import { Injectable } from '@angular/core';
import { NavController, NavOptions, AlertController, ToastController, LoadingController } from "ionic-angular";
import { Http, Headers, RequestOptions } from '@angular/http';
import * as JWT from 'jwt-decode';
import { DetalleSolicitud } from '../pages/detalle/detalle';

@Injectable()
export class Servicios {
  constructor(public loadingCtrl: LoadingController, private http: Http, public alerta: AlertController, public toastCtrl: ToastController) {
    // PRODUCTION --> this.path = "https://guarded-oasis-37936.herokuapp.com";
    this.path = "https://guarded-oasis-37936.herokuapp.com";
    // DEVELOPMENT --> this.path = "http://des.gestionarturnos.com";
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

  setEmail(ID,email){
    return this.http.post(this.path + "/afiliado/modificarEmail", {ID:ID,EMAIL:email}, this.optionsPOST);
  }

  setLogin(token,credenciales){
    var datos:any = JWT(token)
    console.log(datos)
    localStorage.setItem('CobertecToken', token);
    localStorage.setItem('CobertecLogueado', 'true');
    localStorage.setItem('CobertecNombreAfiliado', datos.nombre )
    localStorage.setItem('CobertecIDUser', datos.user_id);
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

  EnviarEstudio(Datos){
    return this.http.post(this.path + "/solicitud/createEstudio", Datos, this.optionsPOST);
  }

  getTEnespera(){
    return this.http.get(this.path + "/solicitud/enespera/" + this.dni,  this.optionsGET);
  }

  getClinicasLista(){
    return this.http.get(this.path + "/climedApp/all",  this.optionsGET);
  }

  getFarmaciasLista(){
    return this.http.get(this.path + "/farmaciaApp/all",  this.optionsGET);
  }

  getParticularesLista(){
    return this.http.get(this.path + "/climedApp/allParticulares",  this.optionsGET);
  }

  getFamiliares(){
    return this.http.get(this.path + "/solicitud/obtenerFamiliares",  this.optionsGET);
  }

  getTConfirmados(){
    return this.http.get(this.path + "/solicitud/confirmadas/" + this.dni,  this.optionsGET);
  }
}