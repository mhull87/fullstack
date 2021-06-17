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
      ('https://melissahullcms-84fb8-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();

          contacts.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          });
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        });
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
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  getMaxId() {
    var maxId = 0;
    for (let contact of this.contacts) {
      var currentId = parseInt(contact.id);
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
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactsListClone = this.contacts.slice();
    this.storeContacts();
  }

  updateContact(origionalContact: Contact, newContact: Contact) {
    if (!origionalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(origionalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = origionalContact.id;
    this.contacts[pos] = newContact;
    this.contactsListClone = this.contacts.slice();
    this.storeContacts();

    this.contacts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
