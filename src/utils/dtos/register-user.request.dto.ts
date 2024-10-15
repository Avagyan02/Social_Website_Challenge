import { IsDate, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength, ValidateIf } from "class-validator";

export class RegisterUserRequestDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        {
            message: 'Passwords will contain at least 1 upper case letter, 1 lower case letter, 1 number or special character'
        }
    )
    password: string;


    @IsString()
    @IsNotEmpty()
    @ValidateIf((model) => model.password)
    passwordConfirm: string;

    @IsDate()
    @IsNotEmpty()
    dateOfBirth: Date;
}
