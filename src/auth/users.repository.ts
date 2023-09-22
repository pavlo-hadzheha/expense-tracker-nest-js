import { GenericRepository } from '../generic.repository';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export class UsersRepository extends GenericRepository<User> {
  constructor(@InjectRepository(User) usersRepository: Repository<User>) {
    super(usersRepository);
  }

  async createUser(signUpDto: SignUpDto) {
    const { username, password } = signUpDto;
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = this.create({ username, password: hashedPassword });
    try {
      const created = await this.save(user);
      delete created.password;
      return created;
    } catch (error) {
      if (Number(error.code) === 23505) {
        // duplicate username
        throw new ConflictException(error.detail);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
