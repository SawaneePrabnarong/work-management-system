export interface Project {
  id: number;
  name: string;
  description?: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProject {
  name: string;
  description?: string;
}
