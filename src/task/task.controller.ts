import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(AuthGuard)
@Controller('task')


export class TaskController {
    constructor(private readonly taskService: TaskService) {}
    @Post(':projectId')
    async addTask(@Param('projectId') projectId: string, @Body() body: CreateTaskDto , @Req() req: any) {
        return await this.taskService.addTask(body, projectId, req.user.id);
    }
    @Get(':projectId')
    async getTasks(@Param('projectId') projectId: string , @Req() req: any) {
    
        return await this.taskService.getTasks(projectId, req.user.id);
    }

    @Patch(':id')
    async updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto, @Req() req: any) {
        return await this.taskService.updateTask(id, body, req.user.id);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string, @Req() req: any) {
        return await this.taskService.deleteTask(id, req.user.id);
    }
}
