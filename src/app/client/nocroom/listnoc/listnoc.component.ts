import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GrafanaService } from 'src/app/services/grafana.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-listnoc',
  templateUrl: './listnoc.component.html',
  styleUrls: ['./listnoc.component.css']
})
export class ListnocComponent implements OnInit{
ojson: any;
  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) { }


  test(){
    const oHelper = this.helperService;
    const t = oHelper.getUrlParameter('t');

    if (typeof (t) === 'undefined' || t === null || t.length === 0) {
      return;
    }

    try {
      const t_decoded = oHelper.base64_decode(oHelper.url_decode(t));
      if (typeof t_decoded !== 'string') {
        throw new Error("Decoded value is not a string");
      }
      const ojson = JSON.parse(t_decoded);

      if (typeof (ojson.user) == 'undefined' || typeof (ojson.pass) == 'undefined') {
        throw new Error("Undefined type");
      }

      if (ojson.user.length == 0 || ojson.pass.length == 0) {
        throw new Error("User or password empty");
      }

      if (typeof (ojson.redirect_to) != 'undefined') {
        // Assuming 'redirect_to' is a URL parameter
        this.helperService.create("redirect_to", ojson.redirect_to);
      }

      document.body.style.backgroundColor = '#FFF';
      setTimeout(() => {
        const formData = {
          username: ojson.user,
          password: ojson.pass
        };

        // Adjust the API endpoint based on your Grafana login endpoint
        const apiUrl = 'http://167.86.107.74:3000/login'; // Update with your actual API endpoint

        this.http.post(apiUrl, formData).subscribe(response => {
          // Handle login success response
          console.log('Login success:', response);
        }, error => {
          // Handle login error
          console.error('Login error:', error);
        });
      }, 500);

    } catch (e) {
      console.error('Error:', e);
    }
  }
  ngOnInit(): void {
   this.test();
  }
}
