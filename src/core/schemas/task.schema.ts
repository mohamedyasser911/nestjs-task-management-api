import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Project } from "./project.schema";
import { TaskStatus } from "./task-status.enum";

@Schema()
export class Task{
        @Prop({required: true})
        title!: string;
        @Prop({required: true})
        description!: string;
       @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
       project!: Types.ObjectId;
       @Prop({required: true , default: TaskStatus.Pending})
       status!: TaskStatus;
    //    @Prop({required: true})
    //    dueDate?: Date;
        
    }
    export const TaskSchema = SchemaFactory.createForClass(Task);

