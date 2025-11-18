import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormTwoComponent } from './form-two/form-two.component';
import { JsonPipe } from '@angular/common';
import { FormOneComponent } from './form-one/form-one.component';
import { TestCacheComponent } from './test-cache/test-cache.component';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    FormTwoComponent,
    JsonPipe,
    FormOneComponent,
    TestCacheComponent,
  ],
  template: `
  <form [formGroup]="form" (ngSubmit)="handlerSubmit()"> 
    <app-test-cache />
    <app-form-one controlKey="tipoPessoa" />
    <app-form-two controlKey="deliveryAddress"/>
    <button>Vai</button>
  </form>

  {{form.value | json}}
  `,
})
export class App {
  name = 'Angular';
  form = new FormGroup({});
  handlerSubmit() {
    console.log(this.form.getRawValue());
  }
}

bootstrapApplication(App,{
  providers: [
    provideHttpClient() 
  ]
} );
