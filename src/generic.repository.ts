import { Repository } from 'typeorm';

export class GenericRepository<T extends object> extends Repository<T> {
  constructor(private repo: Repository<T>) {
    super(repo.target, repo.manager, repo.queryRunner);
  }
}
