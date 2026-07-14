import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/core/schemas/project.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema  }]),
    ],
  providers: [ProjectService , JwtService],
  controllers: [ProjectController]
})
export class ProjectModule {}
