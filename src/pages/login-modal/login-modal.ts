import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Connection } from '../../models/connection';
import * as Errors from '../../constants/errors';
import { loginService } from '../../services/loginService';
import { licenseServer } from '../../services/licenseServer';

/**
 * Generated class for the LoginModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginModalPage implements OnInit{
  connectionID: string;
  connectionName: string;
  connection: Connection;
  loginType: string;
  showEmail: boolean;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, 
              public navParams: NavParams, public viewCtrl: ViewController, 
              private _loginService: loginService, private _licenseServer: licenseServer) {
    debugger; 
    this.connection = new Connection(); 
    this.connectionID = this.connection.ConnectionID = this.navParams.data.connection.ConnectionID[0];
    this.connectionName =  this.connection.ConnectionName = this.navParams.data.connection.ConnectionName[0];
    this.connection.InterfaceType = this.navParams.data.connection.InterfaceType[0];
    this.connection.InterfaceURL = this.navParams.data.connection.InterfaceURL[0];
    this.loginType = this.connection.LoginType = this.navParams.data.connection.LoginType[0];

    this.showEmail = this.isLoginTypeEmail(this.loginType);
  }
  isLoginTypeEmail(loginType: String){
    return (loginType==="EMAIL");
  }
  ngOnInit(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginModalPage');
  }

  submit(){
    debugger;
    if(this.isEmailAndUserNameEmpty(this.connection)) this.presentAlert(Errors.err_noEmailOrUserName);
    else {
      let current_connection = this._licenseServer.connectionMap.get(this.connection.ConnectionID);
      current_connection.Email  = this.connection.Email;
      current_connection.Password = this.connection.Password;

      this._loginService.login(this.connection);
      this.viewCtrl.dismiss();
    }
  }

  isEmailAndUserNameEmpty(connection: Connection){
    return (!(this.connection.Email.length && this.connection.Password.length) || (this.connection.UserName.length && this.connection.UserName.length));    
  }
  
  presentAlert(error: string) {
    let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: error,
        buttons: ['Dismiss']
    });
    alert.present();
}

}
