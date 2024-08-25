import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateSongDto } from './create.song.dto';
import { SongEntity } from '../entities/song.entity';

export class PaginateSongDto {
    @IsNotEmpty()
    data: SongEntity[]
    
    @IsNotEmpty()
    @IsNumber()
    page: number;
   
    @IsNotEmpty()
    @IsNumber()
    total: number;

    @IsNotEmpty()
    @IsNumber()
    limit: number;
}
