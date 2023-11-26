import { Contact } from './../../models/contact-model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactsCollection : AngularFirestoreCollection<Contact>
  contacts : Observable<Contact[]>
  contactDoc : AngularFirestoreDocument<Contact>;

  constructor(private afs : AngularFirestore) {

    this.contactsCollection = this.afs.collection('contacts')
    this.contacts = this.contactsCollection.snapshotChanges()
                        .pipe(map((changes => {
                            return changes.map(c => {
                              const data = c.payload.doc.data() as Contact
                              const id = c.payload.doc.id;
                              return {id, ...data};
                            })
                        })))

   }

   getContacts(){
     return this.contacts;
   }

   createContact(contact: Contact){
    this.contactsCollection.add(contact);
   }

   updateContact(contact: Contact){
    this.contactDoc = this.contactsCollection.doc<Contact>(contact.id);
    this.contactDoc.update(contact)
    }

    destroyContact(contact){
      this.contactDoc = this.contactsCollection.doc<Contact>(contact.id);
      this.contactDoc.delete();
    }
}