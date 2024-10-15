import { Controller, Get, Query } from '@nestjs/common';
import { SearchUserRequestDto } from 'src/utils/dtos/search-user.request.dto';
import { UsersService } from './users.service';
import { ResInterface } from 'src/utils/interfaces/response.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('search')
    async searchUsers(@Query() searchUserDto: SearchUserRequestDto): Promise<ResInterface> {
      return await this.usersService.searchUsers(searchUserDto);
    }
}
