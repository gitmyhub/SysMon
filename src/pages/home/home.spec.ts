import { async, TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from '../../app/app.component';
import { HomePage } from '../../pages/home/home';
import { licenseServer } from '../../services/licenseServer';
import { licenseServiceMock, NavMock } from '../../mocks';

let component: HomePage;
let fixture: ComponentFixture<HomePage>; 
let licenseService: licenseServer;

describe('Home: Home Page', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, HomePage],
      imports: [
        IonicModule.forRoot(MyApp)
      ], 
      providers: [

        {
            provide: NavController,
            useClass: NavMock
        },
          {
            provide: licenseServer,
            useClass: licenseServiceMock,
          }
      ]
    }).compileComponents();

  }));

    beforeEach(() => {
 
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    });

    afterEach(() => {
        fixture.destroy();
        component = null;
    });

    it('is created', () => {
    
        expect(fixture).toBeTruthy();
        expect(component).toBeTruthy();

    }); 


  it('should have activate state as false after construction', () => {
    expect(component.activateState).toBe(false);
  }); 

  it('should have companyId as blank', () => {
    expect(component.userData.companyId).toBe('');
  });  



 /* it ('should have root page as HomePage', () => {
    debugger;
    expect(component.rootPage==HomePage).toBe(true);
  }); */

});