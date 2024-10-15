import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchUserRequestDto } from 'src/utils/dtos/search-user.request.dto';
import { Users } from 'src/utils/entities/users.entity';
import { ResInterface } from 'src/utils/interfaces/response.interface';
import { Between, FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ) {}

    /**
     * this is function is used to get filtered users list.
     * @param searchUserDto
     * @returns promise of ResInterface
    */
    async searchUsers(searchUserDto: SearchUserRequestDto): Promise<ResInterface> {
        const { firstName, lastName, age } = searchUserDto;
        const where: FindOptionsWhere<Users> = {};

        if (age) {
            // Calculates a date range to find users setting the start and end dates for the year they were born.
            const currentYear = new Date().getFullYear();
            const birthYear = currentYear - age;
            const endDate = new Date(birthYear - 1, new Date().getMonth(), new Date().getDate());
            const startDate = new Date(birthYear, 0, 1); 

            where.dateOfBirth = Between(startDate, endDate);
        }

        if (firstName) {
            where.firstName = Like(`%${firstName}%`);
        }
        if (lastName) {
            where.lastName = Like(`%${lastName}%`);
        }

        const users = await this.userRepository.find({
            where,
            order: {
              id: 'DESC'
            },
        });

        return {
            message: "SUCCESS",
            data: users,
        } as ResInterface;
    }
}
