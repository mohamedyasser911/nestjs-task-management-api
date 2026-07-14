import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ProjectModule } from './module/project/project.module';
import { TaskModule } from './task/task.module';


@Module({
  imports: [ ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }), AuthModule , MongooseModule.forRootAsync({
     useFactory: () => ({
    uri: process.env.DATABASE_URL, 
  }),
    }), ProjectModule, TaskModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
