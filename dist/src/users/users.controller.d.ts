import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<import("./user.entity").User>;
    findAll(): Promise<import("./user.entity").User[]>;
    get(id: string): Promise<import("./user.entity").User>;
    update(id: string, dto: UpdateUserDto): Promise<import("./user.entity").User>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
