import { IsMongoId, IsOptional, MaxLength, MinLength } from "class-validator";


export class ProjectDto{
    @MaxLength(32)
     @MinLength(2)
    title!: string;
    @MaxLength(32)
    @MinLength(2)
    description!: string;
    @IsMongoId()
    @IsOptional()
    user?: string;
  
    
   
}