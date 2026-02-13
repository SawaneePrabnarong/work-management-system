import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [NgIf, AsyncPipe, FormsModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail {
  private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsService);
  private location = inject(Location);
  private router = inject(Router);

  editing = false;
  editName = '';
  editDescription = '';

  project$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = Number(params.get('id'));
      return this.projectsService.getProjectDetail(id);
    }),
  );

  goBack() {
    this.location.back();
  }

  startEdit(project: any) {
    this.editing = true;
    this.editName = project.name;
    this.editDescription = project.description || '';
  }

  cancelEdit() {
    this.editing = false;
  }

  saveProject(project: any) {
    this.projectsService
      .updateProject(project.id, {
        name: this.editName,
        description: this.editDescription,
      })
      .subscribe(() => location.reload());
  }

  deleteProject(id: number) {
    if (!confirm('Delete project?')) return;

    this.projectsService.deleteProject(id).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }
}
