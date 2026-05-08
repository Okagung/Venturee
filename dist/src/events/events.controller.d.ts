import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    findAll(): Promise<{
        id_event: number;
        nama_event: string;
        deskripsi_event: string | null;
        harga_event: number;
        kuota: number;
    }[]>;
    search(keyword: string): Promise<{
        id_event: number;
        nama_event: string;
        deskripsi_event: string | null;
        harga_event: number;
        kuota: number;
    }[]>;
    findOne(id: string): Promise<{
        id_event: number;
        nama_event: string;
        deskripsi_event: string | null;
        harga_event: number;
        kuota: number;
    }>;
    create(dto: CreateEventDto): Promise<{
        id_event: number;
        nama_event: string;
        deskripsi_event: string | null;
        harga_event: number;
        kuota: number;
    }>;
    update(id: string, dto: CreateEventDto): Promise<{
        id_event: number;
        nama_event: string;
        deskripsi_event: string | null;
        harga_event: number;
        kuota: number;
    }>;
    remove(id: string): Promise<{
        id_event: number;
        nama_event: string;
        deskripsi_event: string | null;
        harga_event: number;
        kuota: number;
    }>;
}
