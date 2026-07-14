import { IsEmail, IsStrongPassword, MaxLength, MinLength } from "class-validator"

export class signupDto {
    @MaxLength(32)
    @MinLength(2)
    name!: string
    @IsEmail()
    email!: string
    @IsStrongPassword()
    password!: string

}
export class signinDto {
    @IsEmail()
    email!: string
    @IsStrongPassword()
    password!: string
}
    
