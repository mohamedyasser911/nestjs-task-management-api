import { Module } from '@nestjs/common';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/core/schemas/task.schema';
import { Project, ProjectSchema } from 'src/core/schemas/project.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema  },{ name: Project.name, schema: ProjectSchema }]),
      ],
  providers: [TaskService , JwtService],
  controllers: [TaskController]
})
export class TaskModule {}
