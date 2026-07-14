import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { signupDto } from '../dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { User } from 'src/core/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignupService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
   
    async signup(user: signupDto) {
        let emailExist = await this.userModel.findOne({ email: user.email });
        if(emailExist) throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
       this.userModel.insertMany([user]);

        return { message: 'User signed up successfully', user };
}
}
