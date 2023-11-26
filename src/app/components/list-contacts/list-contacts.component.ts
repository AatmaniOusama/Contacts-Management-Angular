import { Contact } from './../../../models/contact-model';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit {

  contacts;
  status : boolean = false;
  myContact : Contact;

  constructor(private contactService : ContactService) {
   }

  ngOnInit() {
    this.contactService.getContacts()
        .subscribe(contact => {
          this.contacts = contact;
          console.log(this.contacts)
        })
  }

  editContact(contact: Contact){
    this.contactService.updateContact(contact)
    this.status = false;
  }

  editToShowContact(contact){
    this.status = true
    this.myContact = contact;
  }

  deleteContact(contact){
    if(confirm('Are you sure ?')){
      this.contactService.destroyContact(contact);
      
    }
    else{
      this.status = false;
    }
  }
}
