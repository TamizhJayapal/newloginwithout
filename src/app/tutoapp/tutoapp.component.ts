import { Component, OnInit } from '@angular/core';
import { Globaldata } from '../globaldata';
import { AuthendicationService } from '../services/authendication.service';

@Component({
  selector: 'app-tutoapp',
  templateUrl: './tutoapp.component.html',
  styleUrls: ['./tutoapp.component.css']
})
export class TutoappComponent implements OnInit {
  username: any;
  constructor(private global: Globaldata, private authservice: AuthendicationService) { }

  ngOnInit() {
    this.username = this.global.userName;
  }
  logout() {
    localStorage.removeItem('eduToken');
    location.reload();
  }
}
