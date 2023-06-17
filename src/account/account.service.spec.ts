import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountEntity } from './entities/account.entity';
import { AccountRepository } from './repositories/account.repository';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';

describe('AccountService', () => {
  let service: AccountService;
  let repository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: AccountRepository,
          useValue: {
            create: jest.fn(),
            login: jest.fn(),
          },
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repository = module.get<AccountRepository>(AccountRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an account', async () => {
    const dto = createAGenericAccountDTO();
    const expectOutputCreateAccount = createEntityFromDto(dto);

    jest
      .spyOn(repository, 'create')
      .mockResolvedValue(expectOutputCreateAccount);

    const newAccount = await service.create(dto);
    expect(newAccount).toEqual(expectOutputCreateAccount);
    expect(repository.create).toHaveBeenCalled();
  });

  it('should return true for existing id', async () => {
    jest.spyOn(repository, 'login').mockResolvedValue(true);
    const isValidId = await service.login(1);

    expect(isValidId).toBe(true);
    expect(repository.login).toHaveBeenCalled();
  });

  it('should return false for a not existing id', async () => {
    jest.spyOn(repository, 'login').mockResolvedValue(false);
    const isValidId = await service.login(2);

    expect(isValidId).toBe(false);
    expect(repository.login).toHaveBeenCalled();
  });
});

function createAGenericAccountDTO(): CreateAccountDto {
  const accoutDTO = new CreateAccountDto();
  accoutDTO.email = faker.internet.email();
  accoutDTO.name = faker.internet.displayName();
  accoutDTO.password = faker.internet.password();
  return accoutDTO;
}

function createEntityFromDto(dto: CreateAccountDto): AccountEntity {
  const accountEntity = new AccountEntity();
  Object.assign(accountEntity, dto);
  return accountEntity;
}
