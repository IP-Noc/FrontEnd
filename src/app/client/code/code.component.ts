import { SessionManagerService } from './../../services/session/session-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  Code!: string;
  constructor(private sessionManagerService: SessionManagerService) { }

  getCode() {
    this.Code = this.sessionManagerService.getData()?.code ?? '';
  }
  ngOnInit(): void {
    this.getCode();
  }

}
