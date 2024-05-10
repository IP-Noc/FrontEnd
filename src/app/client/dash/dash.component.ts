import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  public safeUrl: SafeResourceUrl;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    // Initialize safeUrl to a blank page to prevent errors on initial load
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl("about:blank");
  }

  ngOnInit() {
    this.loadFrameContent();
  }

  private loadFrameContent(): void {
    const url = 'https://localhost/?orgId=1';
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('anthony:anthony')
    });

    this.http.get<string>(url, { headers: headers, responseType: 'text' as 'json' }).subscribe(
      data => {
        console.log('Data received from server:', data);
        if (this.isValidHttpUrl(data)) {
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data);
          console.log('Setting safeUrl to:', data);
        } else {
          console.error('Received data is not a valid URL:', data);
        }
      },
      error => {
        console.error('Error loading the page: ', error);
      }
    );
  }

  private isValidHttpUrl(string: string): boolean {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
}
