import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { signupDto } from '../dto/auth.dto';


@Controller('signup')
export class SignupController {
    constructor(private readonly signupService: SignupService) {}
    @Post()
    async signup(@Body() body: signupDto) {
        return this.signupService.signup(body);
    }
}
