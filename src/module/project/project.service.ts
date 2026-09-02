import { ForbiddenException, HttpException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../../core/schemas/project.schema'; 
import { ProjectDto } from './dto/project.dto';
import { updateProject } from './dto/update-project.dto';
import { ApiFeature } from '../../common/api-features/api-feature';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}
    

    async addProject(body: ProjectDto, userId: string) {
        const newProject = new this.projectModel({ ...body, user: userId });
        await newProject.save();
        return { message: 'Project added successfully' };
    }
    async getAllProjects(query: any) {
        const feature =  new ApiFeature(this.projectModel.find(), query).search().pagination();
        const projects = await feature.query;
        return projects;
       

    }
    async getProject(id: string) {
        return await this.projectModel.findById(id);
    }
    async updateProject(id: string, body: updateProject, userId: string) {
        
        const project = await this.projectModel.findByIdAndUpdate(id, body, { new: true });
       
        if (!project) {
            throw new HttpException('Project not found', 404);
        }
        if (project.user.toString() !== userId) {
        throw new ForbiddenException('You do not have permission to update this project');
    }

return project;
    }
    // async deleteProject(id: string) {
    //     const project = await this.projectModel.findByIdAndDelete(id);
    //     if (!project) {
    //         throw new HttpException('Project not found', 404);
    //     }
    //     return project;
    // }
   async deleteProject(id: string, userId: string) {
    
    const project = await this.projectModel.findById(id);

    
    if (!project) {
        throw new NotFoundException('Project not found');
    }

    
    if (project.user.toString() !== userId) {
        throw new ForbiddenException('You do not have permission to delete this project');
    }

    
    return this.projectModel.findByIdAndDelete(id);
}
       
}
