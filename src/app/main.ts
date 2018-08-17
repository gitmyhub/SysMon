import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import 'web-animations-js/web-animations.min'; // for web animations API

platformBrowserDynamic().bootstrapModule(AppModule);
