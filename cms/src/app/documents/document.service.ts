import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './document.model';
//import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [];
  //  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  newDocument: Document;
  documentsListClone: Document[] = [];

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    //this.maxDocumentId = this.getMaxId();
    this.getDocuments();
  }

  getDocuments() {
    this.http.get<Document[]>('http://localhost:3300/documents')
      .subscribe(
     (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        });
  }

  storeDocuments() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://melissahullcms-84fb8-default-rtdb.firebaseio.com/documents.json', this.documents, { headers })
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  getDocument(id: string) {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    //delete from database
    this.http.delete('http://localhost:3300/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  getMaxId(): number {
    var maxId = 0;
      for (let document of this.documents) {
      var currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    // make sure id of the new Document is empty
    newDocument.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http.post<{ message: string, newDocument: Document }>
      ('http://localhost:3300/documents', newDocument, { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.newDocument);
          this.sortAndSend();

        }
      );


  }

  updateDocument(origionalDocument: Document, newDocument: Document) {
    if (!origionalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === origionalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Docuent to the id of the old Document
    newDocument.id = origionalDocument.id;
  //  newDocument._id = origionalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //update database
    this.http.put('http://localhost:3300/documents/' + origionalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    this.documents.sort((a, b) => {
      if (a.name.toUpperCase()< b.name.toUpperCase()) {
        return -1;
      } if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      } else {
        return 0;
      }
    });
    this.documentListChangedEvent.next(this.documents.slice());
  }

}
