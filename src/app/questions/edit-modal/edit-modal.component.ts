import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';
import {ModalService} from "./modal.service";
import {question, QuestionService} from "../shared/question.service";
import {FormArray, FormControl, FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditModalComponent implements OnInit, OnDestroy {
  // @ViewChild('formElement') editForm: NgForm
  @Input() modalId: string;
  public editedQuestionEmitter = new EventEmitter<question>()
  private modalElement: any;
  @Input() currentQuestion: question;
  public chosenTopics: string[] = [];
  public questionData = {
    title: '',
    type: '',
    topics: [],
    description: '',
    maxLength: 0
  }

  constructor(public modalService: ModalService, private el: ElementRef, private questionService: QuestionService) {

    this.modalElement = this.el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.modalId) {
      console.error('modal must have an id')
      return;
    }
    document.body.appendChild(this.modalElement)

    this.modalElement.addEventListener('click', el => {
      if (el.target.className === 'edit-modal') {
        this.close()
      }
    });
    this.modalService.add(this)


  }


  open() {
    this.currentQuestion = this.modalService.currentQuestion;
    this.chosenTopics = this.currentQuestion.topics.slice();
    console.log(this.currentQuestion);
    this.modalElement.style.display = 'block';
    document.body.classList.add('jw-modal-open');
    const topics = this.currentQuestion.topics.map(el => el)



  }

  close() {
    this.modalElement.style.display = 'none'
    document.body.classList.remove('jw-modal-open')
  }

  onSave(form: NgForm) {

    this.questionData.title = form.value.title;
    this.questionData.description = form.value.description;
    this.questionData.type = form.value.type;
    this.questionData.topics = [...this.chosenTopics];
    this.questionData.maxLength = parseInt(form.value.maxLength);


    this.questionService.editQuestion(this.questionData)

    console.log('from save',this.questionData);
    console.log('from save 2', form)
    this.close();
  }

  ngOnDestroy() {
    this.modalService.remove(this.modalId)
    this.modalElement.remove();
  }

  onPickTopicInModal(topic: string) {
    if (this.currentQuestion.topics.length === this.chosenTopics.length ||
    this.chosenTopics[topic] === topic) {
      return;
    } else {
      this.chosenTopics.push(topic)
    }

  }

  onRemoveTopicFromModal(topic: string) {
    this.chosenTopics = this.chosenTopics.filter(el => el !== topic)
    console.log(this.chosenTopics)
  }



}
