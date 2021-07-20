import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";



export interface Topics {
  name: string;
}
@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {
  questionAmount = 1000
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  topics: Topics[] = [];
  clearPlaceholder = 'Type text'
  cardIsOpen = false;

  questionsList = [
    {title: 'Title 1', topics: ['java','node'], description: 'sldfkpsodgkodfijhefguhjeugfijguidfuisldfkpsodgkodfijhefguhjeugfijguidfuisldfkpsodgkodfijhefguhjeugfijguidfuisldfkpsodgkodfijhefguhjeugfijguidfuisldfkpsodgkodfijhefguhjeugfijguidfuisldfkpsodgkodfijhefguhjeugfijguidfuisldfkpsodgkodfijhefguhjeugfijguidfuisldfkpsodgkodfijhefguhjeugfijguidfuisldfkpsodgkodfijhefguhjeugfijguidfuisldfkpsodgkodfijhefguhjeugfijguidfuisldfkpsodgkodfijhefguhjeugfijguidfuisldfkpsodgkodfijhefguhjeugfijguidfuisldfkpsodgkodfijhefguhjeugfijguidfui'},
    // {title: 'Title 2', topics: ['javascript','express'], description: 'sldfkpsodgkodfijhefguhjeugfijguidfui'},
    // {title: 'Title 3', topics: ['angular','react'], description: 'sldfkpsodgkodfijhefguhjeugfijguidfui'},
  ]
  constructor() {
  }

  ngOnInit(): void {

  }

  add(event: MatChipInputEvent, inp): void {
    const value = (event.value || '').trim();

    // Add our topic
    if (value) {
      this.topics.push({name: value});
      this.clearPlaceholder = ''
    }

    // Clear the input value
    inp.value = ''

  }

  remove(fruit: Topics): void {
    const index = this.topics.indexOf(fruit);

    if (index >= 0) {
      this.topics.splice(index, 1);
    }

      if (this.topics.length < 1) {
        this.clearPlaceholder = 'Type text'
    }

  }

  // onOpenCard(card) {
  //
  //  if (card.className === 'card-closed') {
  //    card.classList.add('card-open')
  //    card.classList.remove('card-closed')
  //  } else if (card.className === 'card-open') {
  //    card.classList.add('card-closed')
  //    card.classList.remove('card-open')
  //  }
  //
  //   console.log(card.classList);
  //  console.log(card.textContent.length)
  // }

}
