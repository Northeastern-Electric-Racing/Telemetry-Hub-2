import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { FormInputGroupComponent } from '../form-input-group/form-input-group.component';

@Component({
  selector: 'form-template',
  templateUrl: "./form-template.component.html",
  styleUrl: "./form-template.component.css",
  template: `
    <!-- <img class="logo" src="https://www.decodedfrontend.io/wp-content/uploads/2021/01/logo-01.png"> -->
    
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="form-field">
        <label for="displayName">Display Name</label>
        <input formControlName="displayName" type="text" id="displayName">
      </div>
      <form-input-group label="Delivery Address" controlKey="deliveryAddress"></form-input-group>
      <form-input-group label="Billing Address" controlKey="billingAddress"></form-input-group>
      <button>Submit</button>
    </form>
  `
})
export class FormTemplateComponent {
  argumentList: string[] = ["arg1", "arg2", "arg3"];

  form = new FormGroup({
    inputArgument: new FormControl('')
  });
  submit() {
    // do whatever you need with it...
    console.log(this.form.value);
    this.form.reset();
  }

}
