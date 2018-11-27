import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {environment} from '../environments/environment.dev';
import {parseString} from 'xml2js';

@Injectable()
export class licenseServer {
    connections: any[];
    constructor(private http: HttpClient) {

    }
getData(IV_CompanyID){

/*    let connectionsPromise = new Promise((resolve, reject)=>{
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', environment.licenseHost , true);
        //the following variable contains my xml soap request (that you can get thanks to SoapUI for example)
        let sr = this.createBody(IV_CompanyID);
        // Send the POST request
        xmlhttp.setRequestHeader('Content-Type','text/html;charset=UTF-8');
        //xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        //xmlhttp.setRequestHeader('Authorization', 'Basic U01GSVNFUlZJQ0U6V29yazREZXNJREVB');
        //xmlhttp.responseType = "document";
        debugger;
        xmlhttp.send(sr);    
    
        xmlhttp.onreadystatechange =  () => {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    let xml = xmlhttp.responseXML;
                    debugger;
                    let result = xml.getElementsByTagName("EV_Result")[0].nodeValue;
                    let message = xml.getElementsByTagName("EV_Message")[0].nodeValue;
                    if(result!='E'){
                        debugger;
                        resolve(xml);
                    }else{
                        debugger;
                        reject(message);
                    }
                    //let response_number = parseInt(xml.getElementsByTagName("return")[0].childNodes[0].nodeValue); //Here I'm getting the value contained by the <return> node
                    //console.log(response_number); //I'm printing my result square number
                }
            }
        }
    })

    connectionsPromise.then((message)=>{
        debugger;
        console.log(message);
    }).catch((message)=>{
        debugger;
        console.log(message);
    }) */

    let sr = this.createBody(IV_CompanyID);
    let headers = new HttpHeaders({
        //"Access-Control-Allow-Origin" : "*",
        //"Access-Control-Allow-Methods" : "POST, GET, OPTIONS, PUT",            
        'Content-Type':  'text/xml', //<- To SEND XML    ; charset="utf-8" 
        //'Accept': 'text/xml', //'*/*',
        //'Authorization': 'Basic U01GSVNFUlZJQ0U6V29yazREZXNJREVB'
        //'Response-Type':'text'      
    }).set('Accept', 'text/xml');

    debugger;
    this.http.post(environment.licenseHost,sr,{headers: headers, responseType: 'text'})
        .map(res => {
            debugger;
            let data;
            parseString( res, function (err, result) {
                debugger;
             console.dir(err); //Prints JSON object!            
             console.dir(result); //Prints JSON object!
             data = result;
            });
            return data;
        })
        .subscribe(
            data => {
                debugger;
                console.log("Success message is: "+data);
                try{
                    let attributes: any[] = data['soap-env:Envelope']['soap-env:Body'][0]['n0:_-DESIDEA_-LICENSE_SERVERResponse'][0]['ET_Attributes'][0]['item'];
                    this.connections = data['soap-env:Envelope']['soap-env:Body'][0]['n0:_-DESIDEA_-LICENSE_SERVERResponse'][0]['ET_Connections'][0]['item'];
                    let result: String = data['soap-env:Envelope']['soap-env:Body'][0]['n0:_-DESIDEA_-LICENSE_SERVERResponse'][0]['EV_Result'][0];
                    let message = data['soap-env:Envelope']['soap-env:Body'][0]['n0:_-DESIDEA_-LICENSE_SERVERResponse'][0]['EV_Message'][0];
                    if(result == 'E'){
                        throw new 
                    }
                }catch (error){
                    console.log('error while reading results from server', error.name);
                }
            },
            error => {
                debugger;
                console.log("error message is: "+error);
            }
        );   
/*    this.http.post('https://webdispatcher-d.brother.com:44500/sap/bc/rest/zb2c/zb2c_getprodreg/BPNUMBER=0001021978&LANGUAGE=e','',head)
        .subscribe(
            data => {
                debugger;
                console.log("Sucess message is: "+data);
            },
            error => {
                debugger;
                console.log("error message is: "+error);
            }
        );   */

}

createBody(IV_CompanyID){
/*  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mat="http://mathsutility.test.com/">
      <soapenv:Header/>
      <soapenv:Body>
        <urn:_-DESIDEA_-LICENSE_SERVER>
            <IT_Attributes>
                <!--Zero or more repetitions:-->
                <item>
                <AttributeName></AttributeName>
                <AttributeValue></AttributeValue>
                </item>
            </IT_Attributes>
            <IV_Action>GETDATA</IV_Action>
            <IV_AppID>SMF</IV_AppID>
            <IV_CompanyID>`+IV_CompanyID+`</IV_CompanyID>
            <!--Optional:-->
            <IV_ConnectionID></IV_ConnectionID>
            <!--Optional:-->
            <IV_DeviceID></IV_DeviceID>
            <!--Optional:-->
            <IV_UserID></IV_UserID>
        </urn:_-DESIDEA_-LICENSE_SERVER>
      </soapenv:Body>
    </soapenv:Envelope>`; */

    return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:_-DESIDEA_-LICENSE_SERVER>
          <!--Optional:-->
          <IT_Attributes>
             <!--Zero or more repetitions:-->
             <item>
                <AttributeName></AttributeName>
                <AttributeValue></AttributeValue>
             </item>
          </IT_Attributes>
          <IV_Action>GETDATA</IV_Action>
          <IV_AppID>SMF</IV_AppID>
          <IV_CompanyID>`+IV_CompanyID+`</IV_CompanyID>
          <!--Optional:-->
          <IV_ConnectionID></IV_ConnectionID>
          <!--Optional:-->
          <IV_DeviceID></IV_DeviceID>
          <!--Optional:-->
          <IV_UserID></IV_UserID>
       </urn:_-DESIDEA_-LICENSE_SERVER>
    </soapenv:Body>
 </soapenv:Envelope>`;
}

}