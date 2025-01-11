import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class VerifyEmailDto {
  @IsNotEmpty()
  @MinLength(32)
  @MaxLength(32)
  token: string;
}
