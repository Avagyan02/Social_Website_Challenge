import { IsInt } from "class-validator";

export class FriendAddRequestDto{
    @IsInt()
    receiverUserId: number;
}
