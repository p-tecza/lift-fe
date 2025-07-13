import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UploadService} from "../../../services/upload.service";

@Component({
  selector: 'app-text-uploader',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './text-uploader.component.html',
  styleUrl: './text-uploader.component.scss'
})
export class TextUploaderComponent implements OnInit {

  myForm: FormGroup = new FormGroup({});

  constructor(private uploadService: UploadService) {
  }


  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log("ON SUBMIT")
    if (this.myForm == undefined) return;
    this.uploadService.uploadPlainTextTicket(this.myForm).subscribe(
      res => console.log(res)
    );
    //TODO dodaj przesylanie za pomcoa uploadService
    console.log(this.myForm.value);

  }

  onChange() {
    console.log(this.myForm.value);
  }


}
