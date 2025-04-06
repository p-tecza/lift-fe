import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-text-uploader',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './text-uploader.component.html',
  styleUrl: './text-uploader.component.scss'
})
export class TextUploaderComponent implements OnInit{

  myForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}


  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
  }
  onSubmit() {

    if(this.myForm == undefined) return;

    console.log(this.myForm.value);
    // You can add code here to submit the form data to a server or do something else with it
  }

  onChange(){
    console.log(this.myForm.value);
  }



}
