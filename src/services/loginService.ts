import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import 'rxjs/add/operator/map'
import { environment } from '../environments/environment.dev';
import { parseString } from 'xml2js';
import { AlertController } from 'ionic-angular';
import * as Errors from '../constants/errors';
import { ModalController, NavParams } from 'ionic-angular';
import { Connection } from '../models/connection';
import { LoginModalPage } from '../pages/login-modal/login-modal';
import { licenseServer } from './licenseServer';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';


@Injectable()
export class loginService {
    udid: any;
    constructor(private http: HttpClient, private ga: GoogleAnalytics, private alertCtrl: AlertController, 
                public modalCtrl: ModalController, public _licenseServer: licenseServer, private uniqueDeviceID: UniqueDeviceID) {
                    this.uniqueDeviceID.get()
                    .then((uuid: any) => this.udid = uuid)
                    .catch((error: any) => {
                        this.ga.trackException(error + Errors.err_creatingDeviceId, false);
                        console.log(error)
                    });
    }

    login(connection: Connection) {
        let sr = this.createBody(connection);
        let headers = new HttpHeaders({
            //"Access-Control-Allow-Origin" : "*",
            //"Access-Control-Allow-Methods" : "POST, GET, OPTIONS, PUT",            
            'Content-Type': 'text/xml', //<- To SEND XML    ; charset="utf-8" 
            //'Accept': 'text/xml', //,
            //'Authorization': 'Basic U01GSVNFUlZJQ0U6V29yazREZXNJREVB'
            //'Response-Type':'text'      
        }).set('Accept', 'text/xml');

        this.http.post(environment.licenseHost, sr, { headers: headers, responseType: 'text' })
            .map(res => {
                let data;
                parseString(res, function (err, result) {
                    console.dir(err); //Prints JSON object!            
                    console.dir(result); //Prints JSON object!
                    data = result;
                });
                return data;
            })
            .subscribe(
                data => {
                    console.log('Success message is: ' + data);
                    try {
                        this.parseData(data);
                        //if (this.connections.length > 0) this.checkConnections();
                    } catch (error) {
                        console.log('error while reading results from server', error.message);
                    }
                },
                error => {
                    console.log('error message is: ' + error);
                }
            );
    }
    parseData(data){
        let attributes: any[] = data['soap-env:Envelope']['soap-env:Body'][0]['n0:_-DESIDEA_-LICENSE_SERVERResponse'][0]['ET_Attributes'][0]['item'];
        //this.connections = data['soap-env:Envelope']['soap-env:Body'][0]['n0:_-DESIDEA_-LICENSE_SERVERResponse'][0]['ET_Connections'][0]['item'];
        let result: String = data['soap-env:Envelope']['soap-env:Body'][0]['n0:_-DESIDEA_-LICENSE_SERVERResponse'][0]['EV_Result'][0];
        let message = data['soap-env:Envelope']['soap-env:Body'][0]['n0:_-DESIDEA_-LICENSE_SERVERResponse'][0]['EV_Message'][0];
        if (result == 'E') {
                this.ga.trackException(message + ' for ' , false);
                this.presentAlert(message);
                throw new Error(message);
        }
    }

    presentAlert(message) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: message,
            buttons: ['Dismiss']
        });
        alert.present();
    }    

    createBody(connection: Connection) {
        return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
        <soapenv:Header/>
        <soapenv:Body>
        <urn:_-DESIDEA_-SMFI_LOGIN>
            <!--Optional:-->
            <IT_Attributes>
            <!--Zero or more repetitions:-->
            <item>
                <AttributeName></AttributeName>
                <AttributeValue></AttributeValue>
            </item>
            </IT_Attributes>
            <IV_Action>LOGIN</IV_Action>
            <IV_AppID>SMF</IV_AppID>
            <IV_CompanyID>`+ this._licenseServer.IV_CompanyID  +`</IV_CompanyID>
            <IV_ConnectionID>`+ connection.ConnectionID +`</IV_ConnectionID>
            <IV_DeviceID>`+ this.udid +`</IV_DeviceID>
            <!--Optional:-->
            <IV_Email>`+ connection.Email  +`</IV_Email>
            <!--Optional:-->
            <IV_Password>`+ connection.Password +`</IV_Password>
            <!--Optional:-->
            <IV_TokenID></IV_TokenID>
            <!--Optional:-->
            <IV_UserID></IV_UserID>
        </urn:_-DESIDEA_-SMFI_LOGIN>
        </soapenv:Body>
        </soapenv:Envelope>`;
    }

}