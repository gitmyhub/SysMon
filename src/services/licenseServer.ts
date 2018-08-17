import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {environment} from '../environments/environment.dev';

@Injectable()
export class licenseServer {


getData(IV_CompanyID){

    let connectionsPromise = new Promise((resolve, reject)=>{
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', environment.licenseHost , true);
    
        //the following variable contains my xml soap request (that you can get thanks to SoapUI for example)
        let sr = this.createBody(IV_CompanyID);
        // Send the POST request
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);    
    
        xmlhttp.onreadystatechange =  () => {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    let xml = xmlhttp.responseXML;
                    let result = xml.getElementsByTagName("EV_Result")[0].nodeValue;
                    let message = xml.getElementsByTagName("EV_Message")[0].nodeValue;
                    if(result!='E'){
                        resolve(xml);
                    }else{
                        reject(message);
                    }
                    //let response_number = parseInt(xml.getElementsByTagName("return")[0].childNodes[0].nodeValue); //Here I'm getting the value contained by the <return> node
                    //console.log(response_number); //I'm printing my result square number
                }
            }
        }
    })

    connectionsPromise.then((message)=>{
        console.log(message);
    }).catch((message)=>{
        console.log(message);
    })

}

createBody(IV_CompanyID){
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mat="http://mathsutility.test.com/">
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
    </soapenv:Envelope>`;
}

}