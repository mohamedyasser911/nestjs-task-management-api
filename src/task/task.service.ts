import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { Model } from 'mongoose';
import { Task } from 'src/core/schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from 'src/core/schemas/project.schema';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
     constructor(@InjectModel(Task.name) private taskModel: Model<Task> , @InjectModel(Project.name)
private projectModel: Model<Project>) {}

        
    
    async addTask(body: CreateTaskDto, projectId: string, userId: string) {

        const newTask = new this.taskModel({ ...body, project: projectId });
        const project = await this.projectModel.findById(projectId);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        if (project.user.toString() !== userId) {
            throw new ForbiddenException('You do not have permission to add a task to this project');
        }
       
        await newTask.save();
        return { message: 'Task added successfully' };
    }
    async getTasks(projectId: string , userId: string) {
        const project = await this.projectModel.findById(projectId);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        if (project.user.toString() !== userId) {
            throw new ForbiddenException('You do not have permission to add a task to this project');
        }
        const tasks = await this.taskModel.find({ project: projectId }).populate('project');
        return tasks;
    }
    async updateTask(id: string, body: UpdateTaskDto, userId: string) {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        const project = await this.projectModel.findById(task.project);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        if (project.user.toString() !== userId) {
            throw new ForbiddenException('You do not have permission to update this task');
        }
        Object.assign(task, body);
        await task.save();
        return { message: 'Task updated successfully' , task: task };
    }
    async deleteTask(id: string, userId: string) {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        const project = await this.projectModel.findById(task.project);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        if (project.user.toString() !== userId) {
            throw new ForbiddenException('You do not have permission to delete this task');
        }
        await task.deleteOne();
        return { message: 'Task deleted successfully' };
    }

}
