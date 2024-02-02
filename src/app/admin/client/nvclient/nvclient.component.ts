import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-nvclient',
  templateUrl: './nvclient.component.html',
  styleUrls: ['./nvclient.component.css']
})
export class NvclientComponent  implements OnInit{


  AddCompany!:FormGroup

  submitted = false;
  selectedFile:  File | null = null;
  adminerv: any;
  status!: boolean;

constructor( private br:FormBuilder, private adminServ:AdminService) {
  this.AddCompany=this.br.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,}$/)]],
    address:['',[Validators.required]],
    logo:['',[Validators.required]],
})
}

  @ViewChild('uploadFile') uploadFile!: ElementRef;
  progressValue: number = 0;
  imageDataUrl: string | null = null;
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[event.target.files.length - 1] as File;

      // You can perform additional checks or operations here if needed

      // Store the file in this.selectedFile
      this.selectedFile = file;
      console.log('File Name:', this.selectedFile);

      // Perform any other operations or updates needed
      const imagePreview = this.uploadFile.nativeElement.closest('.imgUp').querySelector('.imagePreview');
      if (imagePreview) {
        (imagePreview as HTMLElement).style.backgroundImage = `url(${URL.createObjectURL(file)})`;

        // Store the Data URL for further use
        this.imageDataUrl = URL.createObjectURL(file);
        console.log('Image Data URL:', this.imageDataUrl);
      }
    }
  }


  get f() {
    return this.AddCompany.controls;
  }

  submitForm() {
console.log("clicked !")
    const formData = new FormData();
    formData.append('name', this.AddCompany.get('name')?.value);
    formData.append('email', this.AddCompany.get('email')?.value);
    formData.append('phone', this.AddCompany.get('phone')?.value);
    formData.append('location', this.AddCompany.get('address')?.value);
    formData.append('image', this.selectedFile!!, this.selectedFile?.name);

    this.adminServ.AddCompany(formData).subscribe({
      next: (data) => {
        console.log(data);
        this.status = true;
        this.resetForm();
      },
      error: (err: any) => {
        console.error('Error:', err);
      },
    });
  }
  resetForm() {
  }


  ngOnInit(): void {
  }
}

