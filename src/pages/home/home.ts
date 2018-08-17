import { Component, OnInit, HostBinding,Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FLY_IN_OUT_ANIMATION} from '../../animations/fly-In-Out.animation';
import {SlideInOutAnimation} from '../../animations/slide-In-Out.animation';
import{licenseServer} from '../../services/licenseServer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    FLY_IN_OUT_ANIMATION,
    SlideInOutAnimation
  ] 
})
export class HomePage implements OnInit{
  //flyInOutTrigger = 'in';
  activateState: boolean;
  userData = {"companyId":""};
  animationState: String;

  constructor(public navCtrl: NavController, private _licenseServer: licenseServer) {
    this.activateState = false;
    this.animationState = 'collapse';
  }
  ngOnInit(){

  }
   toggleState(){
    this.activateState = (this.activateState == true)? false: true;
    this.animationState = this.activateState == true ? 'expand' : 'collapse';

  }
  openLink() {
  }
  Submit(){
    console.log("Submit called"+this.userData.companyId);
    this._licenseServer.getData(this.userData.companyId);
  }
  activateDemo() {
  }  
}
