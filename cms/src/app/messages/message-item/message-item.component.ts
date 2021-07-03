import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    const showSender = () => {
      const contact: Contact | null = this.contactService.getContact(this.message.sender);
      this.messageSender = contact?.name ?? 'Unknown contact';
    }

    showSender();

    this.contactService.contactListChangedEvent.subscribe(showSender);

    this.contactService.getContacts();
    const contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

}
