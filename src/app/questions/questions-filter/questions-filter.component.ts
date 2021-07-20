import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {question, QuestionService} from "../shared/question.service";


@Component({
  selector: 'app-questions-filter',
  templateUrl: './questions-filter.component.html',
  styleUrls: ['./questions-filter.component.scss']
})
export class QuestionsFilterComponent implements OnInit {
  @ViewChild('element') checkBoxInput: ElementRef
  topics: string[];
  filterForm: FormGroup;
  expanded = false;
  formData: question
  constructor( private questionService: QuestionService) { }

  ngOnInit(): void {
    this.topics = this.questionService.availableTopics

    this.filterForm = new FormGroup({
      "title": new FormControl(null),
      "type": new FormControl('code'),
      "topics": new FormArray([])
    })
  }

  getControls() {
    return (<FormArray>this.filterForm.get('topics')).getRawValue();
  }

  onSearch(form) {
    this.formData = this.filterForm.value;
    this.resetFormValue()
    console.log(this.formData)
    form.reset()
  }

  onAddTopic(input, index) {
    if (input.checked) {
      if ((this.filterForm.get('topics').value.length >= this.topics.length)  ||
        (input.value == this.filterForm.get('topics').value[index])) {
        return;
      } else {
        (<FormArray>this.filterForm.get('topics')).push(new FormControl(input.value));
      }
    }

  }

  onRemoveTopic(index) {
    (<FormArray>this.filterForm.controls['topics']).removeAt(index)

  }

  showCheckboxes() {
    let checkboxes = document.getElementById("checkboxes");
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded = false;
    }
  }

  resetFormValue () {
    let arr = (<FormArray>this.filterForm.controls['topics']);
    this.filterForm.get('title').reset();
    this.filterForm.get('type').reset('code');
    document.querySelectorAll('.list-item').forEach(el => el.remove());
    document.getElementById("checkboxes").style.display = 'none';
    this.expanded = false;
    arr.clear();
  }


}
