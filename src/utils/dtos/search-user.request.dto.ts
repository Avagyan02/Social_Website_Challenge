import { IsInt, IsOptional, IsString } from "class-validator";

export class SearchUserRequestDto {
    @IsOptional()
    @IsString()
    firstName?: string;
  
    @IsOptional()
    @IsString()
    lastName?: string;
  
    @IsOptional()
    @IsInt()
    age?: number;
}
