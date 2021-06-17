import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';
//import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  //messageChangedEvent = new EventEmitter<Message[]>();
  messageChangedEvent = new Subject<Message[]>();
  maxMessageId: number;

  messages: Message[] = [];

  constructor(private http: HttpClient) {
   // this.messages = MOCKMESSAGES;
  }

  getMaxId() {
    var maxId = 0;
    for (let message of this.messages) {
      var currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages() {
    return this.http.get<Message[]>
      ('https://melissahullcms-84fb8-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        });
  }

  storeMessages() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://melissahullcms-84fb8-default-rtdb.firebaseio.com/messages.json', this.messages, { headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  getMessage(id: string) {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }
}
