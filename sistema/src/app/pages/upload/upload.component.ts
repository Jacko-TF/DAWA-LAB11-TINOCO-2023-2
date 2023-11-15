import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent {

  fileForm = new FormGroup({
    file: new FormControl(null)
  })

  uploadFiles: Array<File> = [];

  constructor(private uploadService: UploadService){
  }

  onUpload(){
    //console.log('Upload');
    let formData = new FormData();
    for(let i = 0; i < this.uploadFiles.length; i++){
      formData.append("uploads[]", this.uploadFiles[i], this.uploadFiles[i].name)
    }
    // Call Service Upload
    this.uploadService.uploadFile(formData).subscribe((res) => {
      console.log('Response:', res);
    });
  }

  onFileChange(e: any){
    console.log(e.target.files);
    this.uploadFiles = e.target.files;
  }

  onSubmit(){
    console.log(this.fileForm.controls['file'].value)
    if(this.fileForm.controls['file'].value === null || this.fileForm.controls['file'].value === ''){
      console.log("no hay archivo");
    }else{
      let formData = new FormData();
      for(let i = 0; i < this.uploadFiles.length; i++){
        formData.append("uploads[]", this.uploadFiles[i], this.uploadFiles[i].name)
      }
      // Call Service Upload
      console.log(formData)
      this.uploadService.uploadFile(formData).subscribe((res) => {
        console.log('Response:', res);
      });
    }
  }
}
