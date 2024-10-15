import { Body, Controller, Get, Post, Put, Res } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { User } from 'src/utils/decorators/user.decorator';
import { FriendAddRequestDto } from 'src/utils/dtos/friend-add.request.dto.controller';
import { FriendAcceptOrDeclineRequestDto } from 'src/utils/dtos/friend-accept-or-decline.request.dto';
import { Response } from 'express';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get('list')
  async getUserFriends(
    @User() userId: any,
  ) {
    return await this.friendsService.getUserFriendsList(userId);
  }

  @Post('request')
  async sendFriendRequest(
    @User() senderUserId: number,
    @Body() dto: FriendAddRequestDto,
    @Res() res: Response
  ) {
    const result = await this.friendsService.createFriendRequest(dto, senderUserId);

    return res.status(result.status).send({
      data: result.data,
      message: result.message
    });
  }

  @Put('request')
  async acceptOrDeclineFriendRequest(
    @Body() dto: FriendAcceptOrDeclineRequestDto,
  ) {
    return await this.friendsService.acceptOrDeclineFriendRequest(dto);
  }
}
