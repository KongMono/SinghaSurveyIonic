import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { VisitAddNote } from './visit-add-note';

@NgModule({
  declarations: [
    VisitAddNote,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    VisitAddNote
  ]
})
export class VisitAddNoteModule {}
