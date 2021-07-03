import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
//import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];
//  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  newContact: Contact;
  contactsListClone: Contact[] = [];

  constructor(private http: HttpClient) {
  //  this.contacts = MOCKCONTACTS;
  //  this.maxContactId = this.getMaxId();
  }

  getContacts() {
    return this.http.get<Contact[]>
      ('http://localhost:3300/contacts')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.sortAndSend();

        },
        (error: any) => {
          console.log(error);
        });
  }

  sortAndSend() {
          this.contacts.sort((a, b) => {
            if (a.name.toUpperCase() < b.name.toUpperCase()) {
              return -1;
            } if (a.name.toUpperCase() > b.name.toUpperCase()) {
              return 1;
            } else {
              return 0;
            }
          });
          this.contactListChangedEvent.next(this.contacts.slice());
  }

  storeContacts() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://melissahullcms-84fb8-default-rtdb.firebaseio.com/contacts.json', this.contacts, { headers })
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  getContact(id: string) {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      } 
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    //delete from database
    this.http.delete('http://localhost:3300/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  getMaxId(): number {
    var maxId = 0;
    for (let contact of this.contacts) {
      var currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    //make sure id of the new Contact is empty
    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //add to databasee
    this.http.post<{ message: string, newContact: Contact }>
      ('http://localhost:3300/contacts', newContact, { headers: headers })
      .subscribe(
        (responseData) => {
          //add new contact to contacts
          this.contacts.push(responseData.newContact);
          this.sortAndSend();
        }
      );

  }

  updateContact(origionalContact: Contact, newContact: Contact) {
    if (!origionalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === origionalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = origionalContact.id;
    // newContact._id = origionalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //update database
    this.http.put('http://localhost:3300/contacts/' + origionalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      )
  }

}
