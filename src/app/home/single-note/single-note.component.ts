import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-note',
  standalone: true,
  imports: [NgClass, NgIf, FormsModule, CommonModule],
  templateUrl: './single-note.component.html',
  styleUrl: './single-note.component.scss',
  providers: [DatePipe],
})
export class SingleNoteComponent implements DoCheck {
  //Cambiamento di tutte le note

  @Input() notes: any;
  @Output() notesChanged = new EventEmitter<any>();

  //Determina se la nota è attiva

  @Input() noteActive: any;

  @Output() active = new EventEmitter<any>();

  emitActive = () => {
    this.active.emit(this.noteActive);
  };

  //Determina se la textArea è attiva

  textAreaActive: boolean = false;

  setTextArea = () => {
    this.textAreaActive = !this.textAreaActive;
  };

  // Text
  @Input() noteText: any;

  @Output() text = new EventEmitter<any>();

  emitText = () => {
    this.text.emit(this.noteText);
    this.notes.text = this.noteText;
    this.notesChanged.emit(this.notes);
  };

  // Title
  @Input() title: any;

  @Output() titleEmitter = new EventEmitter<any>();

  emitTitle = () => {
    this.titleEmitter.emit(this.title);
    this.notes.title = this.title;
    this.notesChanged.emit(this.notes);
  };

  // Date
  @Input() creationDate: any;

  //Applica modifiche
  ngDoCheck(): void {
    this.emitText();
    this.emitTitle();
  }

  //Eliminazione

  @Input() allNotes: any;

  @Output() allNotesChanged = new EventEmitter<any>();

  deleteNote = () => {
    this.allNotes = this.allNotes.filter(
      (note: { id: number }) => note.id != this.notes.id
    );
    this.allNotesChanged.emit(this.allNotes);
    this.noteActive = false;
  };
}
