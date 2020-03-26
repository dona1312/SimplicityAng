import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EditTaskModalComponent } from './edit-task-modal.component';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [EditTaskModalComponent],
  exports: [EditTaskModalComponent],
  bootstrap: [EditTaskModalComponent]
})
export class EditTaskModalModule {}