import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-listnoc',
  templateUrl: './listnoc.component.html',
  styleUrls: ['./listnoc.component.css']
})
export class ListnocComponent implements OnInit{
ojson: any;
dataTable:any=[];
searchText: any;

  constructor(
    private http: HttpClient,
    private helperService: HelperService,
    private cp:CompanyService
  ) { }

getAllRooms(){
  this.cp.getAllnocRoomsbyCompany().subscribe((data:any)=>{
    console.log(data);
    //filter the data isHidden == false
    this.dataTable = data.filter((room:any)=>room.isHidden == false);
  });
}
  ngOnInit(): void {
    this.getAllRooms();
  }
}
