import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../core/schemas/user.schema'; 
import { signinDto } from '../dto/auth.dto';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class SigninService {
     constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {}

     async signin(user: signinDto) {
        let userData = await this.userModel.findOne({ email: user.email });
        if(!(userData && compareSync(user.password, userData.password))){
            throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
        }
        let token = this.jwtService.sign({name: userData.name, email: userData.email, id: userData._id , role: userData.role},{secret: process.env.JWT_SECRET});
        return { message: 'User signed in successfully', token };
    }
}
