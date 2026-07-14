import { Module } from '@nestjs/common';
import { SignupController } from './signup/signup.controller';
import { SignupService } from './signup/signup.service';
import { SigninService } from './signin/signin.service';
import { SigninController } from './signin/signin.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { User, UserSchema } from 'src/core/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SignupController, SigninController],
  providers: [SignupService, SigninService, JwtService]
})
export class AuthModule {}
