import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    nama_user: string;

    @IsEmail()
    email_user: string;

    @IsString()
    @MinLength(6)
    pw_user: string;

    @IsString()
    @IsNotEmpty()
    no_telp: string;
}