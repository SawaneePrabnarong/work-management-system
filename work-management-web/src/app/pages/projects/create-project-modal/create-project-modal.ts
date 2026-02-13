import { Component, EventEmitter, Output } from '@angular/core';
import { CreateProject } from '../../../models/project.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-project-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-project-modal.html',
  styleUrl: './create-project-modal.scss',
})
export class CreateProjectModal {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<CreateProject>();

  name = '';
  description = '';

  submit() {
    if (!this.name.trim()) {
      return;
    }
    this.create.emit({
      name: this.name,
      description: this.description,
    });
  }
}
