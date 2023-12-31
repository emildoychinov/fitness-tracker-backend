import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {

  @IsString()
  @MinLength(8)
  public readonly password: string;

  @MinLength(8)
  public readonly username: string;
}

export class LoginDto {
    
    @IsString()
    public readonly username: string;

    @IsString()
    public readonly password: string;
}