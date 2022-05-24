import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tutorial } from 'src/app/models/task.interface';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.scss'],
})
export class TutorialDetailsComponent implements OnInit {
  @Input() tutorial?: Tutorial;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  message = '';


  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.message = '';
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnChanges(): void {
    this.message = '';
    this.currentTutorial = { ...this.tutorial };
  }
  updatePublished(status: boolean): void {
    if (this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, { published: status })
        .then(() => {
          this.currentTutorial.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
  updateTutorial(): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description
    };
    if (this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
    }
  }
  deleteTutorial(): void {
    if (this.currentTutorial.id) {
      this.tutorialService.delete(this.currentTutorial.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}