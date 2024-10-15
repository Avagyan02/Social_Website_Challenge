import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserRequestDto } from 'src/utils/dtos/login-user.request.dto';
import { RegisterUserRequestDto } from 'src/utils/dtos/register-user.request.dto';
import { Users } from 'src/utils/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ResInterface } from 'src/utils/interfaces/response.interface';

@Injectable()
export class AuthService {
    constructor(    
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) {}


    /**
     * this function is used to create User.
     * @param registerUserDto
     * @returns promise of ResInterface
    */
    async register(registerUserDto: RegisterUserRequestDto): Promise<ResInterface> {
        try {
          const saltRounds = +process.env.JWT_SALT;

          const user: Users = new Users();
          user.firstName = registerUserDto.firstName;
          user.lastName = registerUserDto.lastName;
          user.email = registerUserDto.email;
          user.password = await bcrypt.hash(registerUserDto.password, saltRounds);
          user.dateOfBirth = registerUserDto.dateOfBirth;
          await this.userRepository.save(user);
  
          return {
            message: "SUCCESS",
            data: user.id
          } as ResInterface;
      } catch(error) {
        const pgError = error.driverError;

        // Handle the unique constraint error
        if (pgError.code === '23505') {
          return {
            message: 'A user with this email already exists.',
            data: null,
            status: HttpStatus.BAD_REQUEST
          } as ResInterface
        }
      }
    }


    /**
     * this function is used to login user.
     * @param loginUserDto
     * @returns promise of ResInterface
    */
    async login(loginUserDto: LoginUserRequestDto): Promise<ResInterface> {
        const user = await this.userRepository.findOneBy({ email: loginUserDto.email });

        /*
         * check user exists and passwords compare
        */
        if (user === null || !(await bcrypt.compare(loginUserDto.password, user.password))) {
          return {
            message: "Invalid email or password",
            data: null,
            status: HttpStatus.BAD_REQUEST
          } as ResInterface;
        }
        
        return {
          message: "SUCCESS",
          data: sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
          ),
          status: HttpStatus.OK
        } as ResInterface
    }
}
