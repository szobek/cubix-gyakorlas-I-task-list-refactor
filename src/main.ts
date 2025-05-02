import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppOldComponent } from './app-old/app-old.component';

bootstrapApplication(AppOldComponent, appConfig)
  .catch((err) => console.error(err));
