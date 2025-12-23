import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ContainerComponent } from "./container/container/container.component";
import { mockInterceptor } from "./mocks/mock.interceptors";
import { provideNgxMask } from "ngx-mask";
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from "@angular/material/core";

@Component({
  selector: "app-root",
  imports: [ContainerComponent],
  template: ` <app-container /> `,
})
export class App {
  name = "Angular";
}

bootstrapApplication(App, {
  providers: [
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptors([mockInterceptor])),
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
  ],
});
