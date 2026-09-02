import { Body, Controller, Delete, Get,  Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';
import { updateProject } from './dto/update-project.dto';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Role , Roles } from '../../core/schemas/role.enum';



@Controller('project')
@UseGuards(AuthGuard , RolesGuard)

export class ProjectController {
    constructor(private projectService: ProjectService) {}
    @Post()
    @Roles(Role.Admin)
    async addProject(@Body() body: ProjectDto , @Req() req: any) {
        body.user=req.user.id;
        return await this.projectService.addProject(body , req.user.id);
    }
    @Get()
    getProjects( @Query() query: any) {
    return this.projectService.getAllProjects(query);
    }
    @Get(':id')
    async getProject(@Param('id') id: string) {
        return await this.projectService.getProject(id);
    }
    @Patch(':id')
    // @Roles(Role.Admin)
    async updateProject(@Param('id') id: string, @Body() body: updateProject , @Req() req: any) {   
        return await this.projectService.updateProject(id, body, req.user.id);
    }
    @Delete(':id')
    // @Roles(Role.Admin)
 
async delete(@Param('id') id: string, @Req() req: any) {
    
    return this.projectService.deleteProject(id, req.user.id); 
}
   

}
