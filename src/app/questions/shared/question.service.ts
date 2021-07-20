import {Injectable, EventEmitter, Input} from '@angular/core';
import {Subject} from "rxjs";

export interface question {
  title: string,
  type: string,
  topics: string[],
  description: string,
  maxLength: number
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  specificQuestionID: number;
  availableTopics = ['js', 'node', 'angular', 'java', 'ruby', 'react', 'vue'];
  questionEmitter = new EventEmitter<question[]>()
  changedQuestion = new Subject<question[]>()
  questionList: question[] = [
    {
      title: 'Today was a greate day',
      type: 'video',
      topics: ['js', 'node', 'angular'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolores, eius ex illo, incidunt maiores mollitia neque nisi non officia pariatur, repudiandae. Accusamus, accusantium debitis eius iste perferendis porro possimus reiciendis ullam. Aut dignissimos eaque eligendi, facere nostrum, odio officia quibusdam quos suscipit unde ut voluptates! Dolorem facere facilis laboriosam laborum nulla sit! Asperiores enim error pariatur repellendus sapiente?',
      maxLength: 145
    },
    {
      title: 'The best title',
      type: 'code',
      topics: ['js','node', 'angular'],
      description: '',
      maxLength: 12
    },
    {
      title: 'The best title 2',
      type: 'video',
      topics: ['js', 'node', 'angular'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolores, eius ex illo, incidunt maiores mollitia neque nisi non officia pariatur, repudiandae. Accusamus, accusantium debitis eius iste perferendis porro possimus reiciendis ullam. Aut dignissimos eaque eligendi, facere nostrum, odio officia quibusdam quos suscipit unde ut voluptates! Dolorem facere facilis laboriosam laborum nulla sit! Asperiores enim error pariatur repellendus sapiente?',
      maxLength: 67
    },
    {
      title: 'The best title 3',
      type: 'text',
      topics: ['js', 'node', 'java'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolores, eius ex illo, incidunt maiores mollitia neque nisi non officia pariatur, repudiandae. Accusamus, accusantium debitis eius iste perferendis porro possimus reiciendis ullam. Aut dignissimos eaque eligendi, facere nostrum, odio officia quibusdam quos suscipit unde ut voluptates! Dolorem facere facilis laboriosam laborum nulla sit! Asperiores enim error pariatur repellendus sapiente?',
      maxLength: 9
    },
    {
      title: 'The best title 4',
      type: 'text',
      topics: ['js','node', 'angular'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolores, eius ex illo, incidunt maiores mollitia neque nisi non officia pariatur, repudiandae. Accusamus, accusantium debitis eius iste perferendis porro possimus reiciendis ullam. Aut dignissimos eaque eligendi, facere nostrum, odio officia quibusdam quos suscipit unde ut voluptates! Dolorem facere facilis laboriosam laborum nulla sit! Asperiores enim error pariatur repellendus sapiente?',
      maxLength: 12
    },
    {
      title: 'The best title 5',
      type: 'code',
      topics: ['js', 'node', 'angular'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolores, eius ex illo, incidunt maiores mollitia neque nisi non officia pariatur, repudiandae. Accusamus, accusantium debitis eius iste perferendis porro possimus reiciendis ullam. Aut dignissimos eaque eligendi, facere nostrum, odio officia quibusdam quos suscipit unde ut voluptates! Dolorem facere facilis laboriosam laborum nulla sit! Asperiores enim error pariatur repellendus sapiente?',
      maxLength: 33
    },
    {
      title: 'The best title 6',
      type: 'video',
      topics: ['js', 'node', 'Go'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolores, eius ex illo, incidunt maiores mollitia neque nisi non officia pariatur, repudiandae. Accusamus, accusantium debitis eius iste perferendis porro possimus reiciendis ullam. Aut dignissimos eaque eligendi, facere nostrum, odio officia quibusdam quos suscipit unde ut voluptates! Dolorem facere facilis laboriosam laborum nulla sit! Asperiores enim error pariatur repellendus sapiente?',
      maxLength: 44
    },
  ]
  isSorted = false;


  constructor() {
  }

  getAllQuestions() {
    return this.questionList.slice();
  }

  getQuestionById(id: number) {
    this.specificQuestionID = id
    return this.questionList.slice()[id];
  }

  editQuestion(editedQuestion: question) {
    console.log('before update',this.questionList[this.specificQuestionID]);
    console.log('update',editedQuestion)
    this.questionList[0] = editedQuestion;
    console.log('after update',this.questionList[0]);

    console.log(this.specificQuestionID)
    this.changedQuestion.next(this.questionList.slice())
  }

  sortType(type) {
    const sortedList = this.questionList.slice()
    if (type === 'time' && this.isSorted !== true) {
      this.isSorted = true;
       sortedList.sort(this.sortByTimeASC);
      this.questionEmitter.emit(sortedList);
    } else if (this.isSorted) {
     const sortedByDESC = this.questionList.slice()
      this.isSorted = false;
      sortedByDESC.sort(this.sortByTimeDESC);
      this.questionEmitter.emit(sortedByDESC);
    }

  }

  sortByTimeASC(a,b) {
    return a.maxLength - b.maxLength;
  }

  sortByTimeDESC(a,b) {
    return b.maxLength - a.maxLength;
  }

}
