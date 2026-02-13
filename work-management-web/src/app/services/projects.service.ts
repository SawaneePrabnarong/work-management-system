import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { CreateProject, Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  constructor(private api: ApiService) {}

  loadProjects() {
    return this.api.get<Project[]>('/projects');
  }

  createProject(data: CreateProject) {
    return this.api.post('/projects', data);
  }

  getProjectDetail(id: number) {
    return this.api.get<Project>(`/projects/${id}`);
  }

  updateProject(id: number, data: any) {
    return this.api.patch(`/projects/${id}`, data);
  }

  deleteProject(id: number) {
    return this.api.delete(`/projects/${id}`);
  }
}
