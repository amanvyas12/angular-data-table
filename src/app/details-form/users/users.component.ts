import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Output() userData =  new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

}
