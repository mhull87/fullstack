import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, 'First Document', 'This is the first document', 'www.document.com', 1),
    new Document(2, 'Second Document', 'This is the second document', 'www.document2.com', 2),
    new Document(3, 'Third Document', 'This is the third document', 'www.document3.com', 3),
    new Document(4, 'Fourth Document', 'This is the fourth document', 'www.document4.com', 4),
    new Document(5, 'Fifth Document', 'This is the fifth document', 'www.document5.com', 5)
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
