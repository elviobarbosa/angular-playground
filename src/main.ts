import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ContainerComponent } from "./container/container/container.component";
import { mockInterceptor } from "./mocks/mock.interceptors";
import { provideNgxMask } from "ngx-mask";

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
    provideHttpClient(withInterceptors([mockInterceptor])),
    provideNgxMask(),
  ],
});
