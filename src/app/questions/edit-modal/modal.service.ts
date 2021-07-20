import {Injectable, Input} from '@angular/core';
import {question, QuestionService} from "../shared/question.service";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  currentQuestion: question
  private modals: any[] = []

  constructor(private questionService: QuestionService) { }

  add(modal: any) {
    this.modals.push(modal)
    console.log(this.modals)
  }

  remove(modalId: string) {
    this.modals = this.modals.filter(modal => modal.modalId !== modalId)
  }

  open(modalId: string) {
    // this.currentQuestion = this.questionService.getQuestionById(questionId)
    const modal = this.modals.find(modal => modal.modalId === modalId)
    modal.open()
  }

  close(modalId: string) {
    const modal = this.modals = this.modals.find(modal => modal.modalId === modalId)
    modal.close()
  }


}
