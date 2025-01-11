import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @MinLength(32)
  @MaxLength(32)
  token: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
