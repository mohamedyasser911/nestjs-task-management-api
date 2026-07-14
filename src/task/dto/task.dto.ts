import { IsDate, IsDateString, MaxLength, MinLength } from "class-validator";


export class CreateTaskDto{
    @MaxLength(32)
    @MinLength(2)
    title!: string;
    @MaxLength(32)
    @MinLength(2)
    description!: string;
    // @IsDateString()
    // dueDate?: string;   
}