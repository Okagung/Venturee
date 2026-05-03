import { IsString, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    nama_event: string;

    @IsString()
    @IsNotEmpty()
    deskripsi_event: string;

    @IsNumber()
    harga_event: number;

    @IsNumber()
    kuota: number;

    @IsDateString()
    jadwal_event: string;
}