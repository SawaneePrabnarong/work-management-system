import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { Repository } from 'typeorm';
import { ErrorCode } from 'src/common/error-codes';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async create(name: string, description: string | undefined, userId: number) {
    const project = this.projectRepo.create({
      name,
      description: description ?? null,
      ownerId: userId,
    });

    return this.projectRepo.save(project);
  }

  async findAll(userId: number) {
    return this.projectRepo.find({
      where: {
        ownerId: userId,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(projectId: number, userId: number) {
    const project = await this.projectRepo.findOne({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) {
      throw new NotFoundException({ code: ErrorCode.PROJECT_NOT_FOUND });
    }

    return project;
  }

  async update(
    projectId: number,
    userId: number,
    data: { name?: string; description?: string },
  ) {
    const project = await this.projectRepo.findOne({
      where: { id: projectId, ownerId: userId },
    });

    if (!project) {
      throw new NotFoundException({ code: ErrorCode.PROJECT_NOT_FOUND });
    }

    if (data.name !== undefined) {
      project.name = data.name;
    }

    if (data.description !== undefined) {
      project.description = data.description;
    }

    return this.projectRepo.save(project);
  }

  async remove(projectId: number, userId: number) {
    const project = await this.projectRepo.findOne({
      where: { id: projectId, ownerId: userId },
    });

    if (!project) {
      throw new NotFoundException({ code: ErrorCode.PROJECT_NOT_FOUND });
    }

    await this.projectRepo.remove(project);
    return { message: 'Project removed successfully' };
  }
}
