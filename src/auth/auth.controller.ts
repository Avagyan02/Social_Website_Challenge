import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { RegisterUserRequestDto } from 'src/utils/dtos/register-user.request.dto';
import { AuthService } from './auth.service';
import { LoginUserRequestDto } from 'src/utils/dtos/login-user.request.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterUserRequestDto) {
      return await this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() user: LoginUserRequestDto, @Res() res: Response) {
      const result = await this.authService.login(user);
      
      if (result.status === HttpStatus.OK) {
        /*
        * put token into cookies
        */
        res.cookie(
            'access_token', 
            result.data, 
            {
                httpOnly: true,
                maxAge: +process.env.JWT_MAX_AGE,
            }
        );
      }

      return res.status(result.status).send({
        data: result.data,
        message: result.message
      });
    }
}
