import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { FriendAcceptOrDeclineRequestDto } from 'src/utils/dtos/friend-accept-or-decline.request.dto';
import { FriendAddRequestDto } from 'src/utils/dtos/friend-add.request.dto.controller';
import { Friends } from 'src/utils/entities/friends.entity';
import { Users } from 'src/utils/entities/users.entity';
import { ResInterface } from 'src/utils/interfaces/response.interface';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends)
    private friendsRepository: Repository<Friends>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}
    

    /**
     * this is function is used to get filtered users list.
     * @param createFriendRequest
     * @returns promise of ResInterface
    */
    async createFriendRequest(createFriendRequest: FriendAddRequestDto, senderId: number): Promise<ResInterface> {
      const senderUser = await this.usersRepository.findOne({ where: { id: senderId } });
      const receiverUser = await this.usersRepository.findOne({ where: { id: createFriendRequest.receiverUserId } });
      const isFriendsCheck = await this.friendsRepository.find({
        where: { senderUser, receiverUser  },
        order: {
            id: 'DESC',
        },
        take: 1,
      });
      
      /*
      * This check is used to determine if the friend request was sent, and if it was, whether it was accepted. 
      * These are the cases we are addressing 
      */
      if (!receiverUser || (isFriendsCheck.length && (isFriendsCheck[0].accepted === null || isFriendsCheck[0].accepted))) {
        return {
          message: "BAD_REQUEST",
          data: null,
          status: HttpStatus.BAD_REQUEST
        } as ResInterface
      }
  
      const friendRequest = this.friendsRepository.create({
          senderUser,
          receiverUser,
          requestDate: new Date(),
      });
  
      return {
        message: "SUCCESS",
        data: (await this.friendsRepository.save(friendRequest)).id,
        status: HttpStatus.OK
      } as ResInterface;
    }


    /**
     * this is function is used to accept friend request.
     * @param friendAcceptOrDeclineRequestDto
     * @returns promise of ResInterface
    */
    async acceptOrDeclineFriendRequest(friendAcceptOrDeclineRequestDto: FriendAcceptOrDeclineRequestDto): Promise<ResInterface> {
        const friendRequest = await this.friendsRepository.findOneBy({ id: friendAcceptOrDeclineRequestDto.id });
        friendRequest.accepted = friendAcceptOrDeclineRequestDto.isAccept;
        friendRequest.acceptanceDate = new Date();

        return {
          message: "SUCCESS",
          data: await this.friendsRepository.save(friendRequest),
          status: HttpStatus.OK
        } as ResInterface;
    }


    /**
     * this is function is used to get user friends list.
     * @param userId
     * @returns promise of ResInterface
    */
    async getUserFriendsList(userId: number): Promise<ResInterface> {
      /*
      * It looks at the "friends" table to find accepted friend requests where the user is the sender or receiver. 
      */
      const query = `
        SELECT u."id", u."firstName" || ' ' || u."lastName" AS "fullName", u."email", u."dateOfBirth"
        FROM "users" u
        WHERE u."id" IN (
          SELECT
            CASE 
              WHEN f."senderUserId" = $1 THEN f."receiverUserId"
              ELSE f."senderUserId"
            END AS "friendId"
          FROM "friends" f
          WHERE (f."senderUserId" = $1 OR f."receiverUserId" = $1) 
            AND f."accepted" IS TRUE
        )
      `;
  
      const users = await this.connection.query(query, [userId]);
  
      return {
        message: "SUCCESS",
        data: users,
        status: HttpStatus.OK,
      } as ResInterface;
  }  
}
