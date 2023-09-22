import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthService } from './auth.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private authService: AuthService,
  ) {}

  getAll() {
    return this.usersRepository.find();
  }

  getById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  getByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }
}
