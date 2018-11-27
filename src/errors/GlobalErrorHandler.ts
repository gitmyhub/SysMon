import { ErrorHandler, Injectable } from '@angular/core';
import {IonicErrorHandler} from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@Injectable()
export class GlobalErrorHandler extends IonicErrorHandler {

    constructor(private ga: GoogleAnalytics) {
        super();
      }

  handleError(error: any): void {
    super.handleError(error);
  }
}