import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
   
@Schema()
export class Project{
    @Prop({required: true})
    title!: string;
    @Prop({required: true})
    description!: string;
   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
   user!: Types.ObjectId;
    
}
export const ProjectSchema = SchemaFactory.createForClass(Project);