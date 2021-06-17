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
   // this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    return this.http.get<Document[]>
      ('https://melissahullcms-84fb8-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();

          documents.sort((a, b) => {
            if (a.name.toUpperCase() < b.name.toUpperCase()) {
              return -1;
            } if (a.name.toUpperCase() > b.name.toUpperCase()) {
              return 1;
            } else {
              return 0;
            }
          });
          this.documentListChangedEvent.next(this.documents.slice());
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
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  getMaxId() {
    var maxId = 0;
    for (let document of this.documents) {
      var currentId = parseInt(document.id);
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
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentsListClone = this.documents.slice();
    this.storeDocuments();

    this.documents.sort((a, b) => {
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      } if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  updateDocument(origionalDocument: Document, newDocument: Document) {
    if (!origionalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(origionalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = origionalDocument.id;
    this.documents[pos] = newDocument;
    this.documentsListClone = this.documents.slice();
    this.storeDocuments();

    this.documents.sort((a, b) => {
      if (a.name.toUpperCase()< b.name.toUpperCase()) {
        return -1;
      } if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
