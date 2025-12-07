import { Component } from "@angular/core";
import { FormTwoComponent } from "../../form-two/form-two.component";
import { JsonPipe } from "@angular/common";
import { FormOneComponent } from "../../form-one/form-one.component";
import { TestCacheComponent } from "../../test-cache/test-cache.component";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-container",
  imports: [
    FormTwoComponent,
    JsonPipe,
    FormOneComponent,
    TestCacheComponent,
    ReactiveFormsModule,
  ],
  templateUrl: "./container.component.html",
  styleUrl: "./container.component.css",
})
export class ContainerComponent {
  form = new FormGroup({});
  handlerSubmit() {
    console.log(this.form.getRawValue());
  }
}
