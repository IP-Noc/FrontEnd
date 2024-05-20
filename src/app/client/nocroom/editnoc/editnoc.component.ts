import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/model/Item';
import UserModel from 'src/app/model/UserModel';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-editnoc',
  templateUrl: './editnoc.component.html',
  styleUrls: ['./editnoc.component.css']
})
export class EditnocComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
