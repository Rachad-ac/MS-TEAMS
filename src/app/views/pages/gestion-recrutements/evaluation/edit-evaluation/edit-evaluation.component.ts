import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-evaluation',
  templateUrl: './edit-evaluation.component.html',
  styleUrls: ['./edit-evaluation.component.scss']
})
export class EditEvaluationComponent {

  @Input() evaluationToUpdate: any;
  @Output() submit = new EventEmitter<void>();
}
