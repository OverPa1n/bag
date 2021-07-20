import {
  AfterContentInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  Input, ViewContainerRef
} from '@angular/core';
import {question, QuestionService} from "../shared/question.service";
import {ModalService} from "../edit-modal/modal.service";
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogEditComponent} from "../dialog-edit/dialog-edit.component";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit, OnDestroy {
  questionList: question[] = []
  specificQuestion: question
  subscription: Subscription

  constructor(private questionService: QuestionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscription = this.questionService.questionEmitter.subscribe((questions: question[]) => {
      this.questionList = questions;
    })
    this.subscription = this.questionService.changedQuestion.subscribe((questions: question[]) => {
      console.log('from question list component', questions)
      this.questionList = questions
    })
    this.questionList = this.questionService.getAllQuestions()
    console.log('from component',this.questionList);
  }

  onSort(type: string) {
    this.questionService.sortType(type)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  // openModal(index: number) {
  //   this.specificQuestion = this.questionService.getQuestionById(index)
  //   this.modalService.open('edit-modal');
  // }



 openModal(id: number) {
    const question = this.questionService.getQuestionById(id)
   const dialogConfig = new MatDialogConfig();
   dialogConfig.width = '30%';
   // dialogConfig.autoFocus = true;
   dialogConfig.data = question;
    this.dialog.open(DialogEditComponent, dialogConfig);

 }


}
