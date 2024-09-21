import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';

/**
 * @class NvclientComponent
 * @implements {OnInit}
 * The NvclientComponent class handles the creation of a new client, including form validation,
 * file upload, and form submission.
 */
@Component({
  selector: 'app-nvclient',
  templateUrl: './nvclient.component.html',
  styleUrls: ['./nvclient.component.css']
})
export class NvclientComponent implements OnInit {
  /**
   * @property {FormGroup} AddCompany - Form group for adding a new company.
   */
  AddCompany!: FormGroup;

  /**
   * @property {boolean} submitted - Indicates whether the form has been submitted.
   */
  submitted = false;

  /**
   * @property {File | null} selectedFile - The selected file for upload.
   */
  selectedFile: File | null = null;

  /**
   * @property {any} adminerv - Admin service instance.
   */
  adminerv: any;

  /**
   * @property {boolean} status - Status of the client addition operation.
   */
  status!: boolean;

  /**
   * @property {boolean} loading - Indicates whether a loading operation is in progress.
   */
  loading = false;

  /**
   * @property {ElementRef} uploadFile - Reference to the file input element.
   */
  @ViewChild('uploadFile') uploadFile!: ElementRef;

  /**
   * @property {number} progressValue - Progress value for file upload.
   */
  progressValue: number = 0;

  /**
   * @property {string | null} imageDataUrl - Data URL of the selected image file.
   */
  imageDataUrl: string | null = null;

  /**
   * Constructor for NvclientComponent.
   * @param {FormBuilder} br - FormBuilder service for creating forms.
   * @param {AdminService} adminServ - Admin service for handling API requests.
   */
  constructor(private br: FormBuilder, private adminServ: AdminService) {
    this.AddCompany = this.br.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,}$/)]],
      address: ['', [Validators.required]],
      logo: ['', [Validators.required]],
    });
  }

  /**
   * Handles the file selection event.
   * @param {Event} event - The file selection event.
   * @returns {void}
   */
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[event.target.files.length - 1] as File;

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

  /**
   * Gets the form controls for the AddCompany form.
   * @returns {any} The form controls.
   */
  get f() {
    return this.AddCompany.controls;
  }

  /**
   * Submits the AddCompany form.
   * @returns {void}
   */
  submitForm(): void {
    console.log("clicked !");
    this.loading = true; // Start loading

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
        this.loading = false; // Stop loading
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.loading = false; // Stop loading
      },
    });
  }

  /**
   * Resets the AddCompany form.
   * @returns {void}
   */
  resetForm(): void {
    this.AddCompany.reset();
    this.selectedFile = null;
    this.imageDataUrl = null;
    this.submitted = false;
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @returns {void}
   */
  ngOnInit(): void {}
}
