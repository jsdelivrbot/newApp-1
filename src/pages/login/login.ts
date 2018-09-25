import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { Servicios } from '../../services/services'; 
import { TurnosPendientes } from "../t_pendientes/t_pendientes";
import * as JWT from 'jwt-decode';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private Servicios: Servicios, public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController) {
    this.menu.swipeEnable(false);
  }

  public data = {dni: '', nafiliado: ''};
  // go to register page
  register() {
    
  }

  // login and go to home page
  login() {
    this.Servicios.Loading('on');
    var credenciales = {
      'name': this.data.dni,
      'password': this.data.nafiliado
    }
    this.Servicios.loginService(credenciales)
    .subscribe((response : any) => {
      this.Servicios.Loading('off');
      var token = JSON.parse(response._body).data.token
      var abierto:any = JWT(token)
      if(abierto.email == '' || abierto.email == null){
        let alerta = this.forgotCtrl.create({
          title: 'Ingrese su email',
          message: "Para utilizar la aplicación debe ingresar su email",
          inputs: [
            {
              name: 'email',
              id: 'autofocu',
              placeholder: 'Email..',
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
              text: 'Aceptar',
              handler: data => {
                this.Servicios.Loading('on');
                this.Servicios.setEmail(credenciales.name,data.email)
                .subscribe(
                  res => {
                    this.Servicios.Loading('off');
                    this.Servicios.setLogin(token,credenciales);
                    this.nav.setRoot(TurnosPendientes);
                  },
                  err => {
                    this.Servicios.Loading('off');
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
      }else{
        this.Servicios.setLogin(token,credenciales);
        this.nav.setRoot(TurnosPendientes);
      }
     }, (err) => {
      this.Servicios.Loading('off');
      let alert = this.forgotCtrl.create({
        title: 'Erro al iniciar sesión',
        subTitle: 'Revise los datos e intente nuevamente',
        buttons: ['Aceptar']
      });
      alert.present();
     });;
    
  }



  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
