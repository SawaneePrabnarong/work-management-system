import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProjectsService } from '../../services/projects.service';
import { catchError, Observable, of } from 'rxjs';
import { CreateProject, Project } from '../../models/project.model';
import { CreateProjectModal } from './create-project-modal/create-project-modal';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, CreateProjectModal],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
})
export class Projects {
  projects$!: Observable<Project[]>;
  error = false;
  showModal = false;

  constructor(
    private projectsService: ProjectsService,
    private popup: PopupService,
  ) {
    this.reloadProjects();
  }

  reloadProjects() {
    this.projects$ = this.projectsService.loadProjects().pipe(
      catchError(() => {
        this.error = true;
        return of([]);
      }),
    );
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  createProject(data: CreateProject) {
    this.projectsService.createProject(data).subscribe({
      next: () => {
        this.closeModal();
        this.reloadProjects();

        this.popup.show('Creation successful!', 'The project has been successfully created.');
      },

      error: () => {
        this.closeModal();

        this.popup.show(
          'Creation failed',
          'An error occurred while creating the project. Please try again.',
        );
      },
    });
  }
}
