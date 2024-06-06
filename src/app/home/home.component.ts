import { Component, OnInit, DoCheck } from '@angular/core';
import { SingleNoteComponent } from './single-note/single-note.component';
import {
  NgClass,
  NgFor,
  NgStyle,
  CommonModule,
  NumberSymbol,
} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SingleNoteComponent,
    NgFor,
    NgClass,
    NgStyle,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, DoCheck {
  // Inizzializzione
  ngOnInit(): void {
    localStorage.getItem('notes') ? null : localStorage.setItem('notes', '[]');
  }

  ngDoCheck(): void {
    localStorage.setItem('notes', JSON.stringify([...this.notes]));
  }

  // gestione note

  //Attiva modifica nota
  noteActive: boolean = false;

  valueNoteActive = (value: any) => {
    this.noteActive = value;
  };

  setNoteTrue = (i: number) => {
    this.notes[i].active = true;
    this.noteActive = true;
  };

  setNoteFalse = () => {
    this.noteActive = false;
    this.notes.forEach((note: { active: boolean }) => (note.active = false));
  };

  // gestione testo delle note
  fakeNotes = localStorage.getItem('notes');

  notes: any[] = this.fakeNotes != null ? JSON.parse(this.fakeNotes) : [];

  //Assegna titolo
  assignTitle = (title: any, i: number) => {
    this.notes[i].title = title;
  };

  //Assegna testo
  assignText = (text: any, i: number) => {
    this.notes[i].text = text;
  };

  // Creazione note

  //Apertura della creazione note

  isNewNote: boolean = false;

  setNewNoteTrue = () => {
    this.isNewNote = true;
  };

  setNewNoteFalse = () => {
    this.isNewNote = false;
  };

  // Creazione della singola nuova nota
  createNote = (title: string, e: Event) => {
    e.preventDefault();
    //Crea colori
    let randomR: number = Math.floor(Math.random() * 100) + 100;
    let randomG: number = Math.floor(Math.random() * 100) + 100;
    let randomB: number = Math.floor(Math.random() * 100) + 100;
    //Crea id
    let randomId = Math.floor(Math.random() * 1000);
    //Crea nuova nota
    this.notes = [
      ...this.notes,
      {
        id: randomId,
        title: title,
        text: 'Testo della nuova nota...',
        creationDate: new Date(),
        backgroundColor: `rgb(${randomR}, ${randomG}, ${randomB})`,
        active: true,
      },
    ];
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.noteActive = true;
    this.isNewNote = false;
    this.filteredNoteList = this.notes;
  };

  //Lista filtrata

  filteredNoteList = this.notes;

  //Filtratore
  searchInput: string = '';

  //Filtra lista

  noteFilter = () => {
    if (this.searchInput.length > 0) {
      this.filteredNoteList = this.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(this.searchInput.toLowerCase()) ||
          note.text.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    } else {
      this.filteredNoteList = this.notes;
    }
  };

  //Modifiche dal componente

  assignNotes = (newNotes: any) => {
    this.notes = newNotes;
    this.filteredNoteList = this.notes;
    this.noteFilter();
    this.setNoteFalse();
  };
}
