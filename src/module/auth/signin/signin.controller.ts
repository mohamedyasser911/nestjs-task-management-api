import { Body, Controller, Post } from '@nestjs/common';
import { SigninService } from './signin.service';
import { signinDto } from '../dto/auth.dto';


@Controller('signin')
export class SigninController {
    constructor(private readonly signinService: SigninService){}

    @Post()
    async signin(@Body() user: signinDto) {
        return this.signinService.signin(user);
    }
    
}
