import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AdminUserRequestBody {
  @IsString()
  @IsNotEmpty()
  displayName: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string
}