import { PartialType } from "@nestjs/mapped-types"
import { ProjectDto } from "./project.dto"

export class updateProject extends PartialType(ProjectDto) {}