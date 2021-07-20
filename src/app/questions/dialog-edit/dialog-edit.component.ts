import {Component, OnInit, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {question, QuestionService} from "../shared/question.service";
import {FormArray, FormControl, FormGroup, NgForm} from "@angular/forms";


@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss'],

})
export class DialogEditComponent implements OnInit {
  availableTopics: string[];
  editModal: FormGroup
  expanded = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: question,
              private dialogRef: MatDialog, private questionService: QuestionService) { }

  ngOnInit(): void {

    this.availableTopics = this.questionService.availableTopics
    this.editModal = new FormGroup({
      "title": new FormControl(this.data.title),
      "description": new FormControl(this.data.description),
      "topics": new FormArray(this.data.topics.map(el => new FormControl(el))),
      "type": new FormControl(this.data.type),
      "maxLength": new FormControl(this.data.maxLength)
    })
  }


  getControls() {
    return (<FormArray>this.editModal.get('topics')).getRawValue();
  }
  onSubmit() {
    console.log(this.editModal)
    this.dialogRef.closeAll()
  }

  onAddTopic(input,index: number) {
    console.log(this.editModal.get('topics').value);
    if (input.checked) {
      if ((this.editModal.get('topics').value.length >= this.availableTopics.length)  ||
        (input.value == this.editModal.get('topics').value[index])) {
        return;
      } else {
        (<FormArray>this.editModal.get('topics')).push(new FormControl(input.value));
      }
    }
  }
  onRemoveTopic(index: number) {
    (<FormArray>this.editModal.controls['topics']).removeAt(index)
  }
  showCheckboxes() {
    let checkboxes = document.getElementById("edit-modal-checkboxes");
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded = false;
    }
  }

}
