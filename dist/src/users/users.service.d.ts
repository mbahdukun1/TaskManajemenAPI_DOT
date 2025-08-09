import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(dto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, dto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
