import { IsBoolean, IsInt } from "class-validator";

export class FriendAcceptOrDeclineRequestDto {
    @IsInt()
    id: number;

    @IsBoolean()
    isAccept: boolean
}
