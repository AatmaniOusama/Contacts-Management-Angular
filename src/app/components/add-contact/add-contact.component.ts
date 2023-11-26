import { ContactService } from './../../services/contact.service';
import { Contact } from './../../../models/contact-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  contact: Contact = {
    name: "",
    telephone: 0
  }

  statusContact = false;

  constructor(private service : ContactService) { }

  ngOnInit() {
  }

  addContact(){
    this.service.createContact(this.contact);
    this.contact = {
      name:"",
      telephone:0
    };
    this.statusContact=false;
  }

}
