import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountEntity } from './entities/account.entity';
import { AccountRepository } from './repositories/account.repository';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { UpdateAccountDto } from './dto/update-account.dto';

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
            delete: jest.fn(),
            update: jest.fn(),
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
    const dto = createAGenericAccountDTO('create') as CreateAccountDto;
    const expectOutputCreateAccount = createEntityFromDto(dto);

    jest
      .spyOn(repository, 'create')
      .mockResolvedValue(expectOutputCreateAccount);

    const newAccount = await service.create(dto);
    expect(newAccount).toEqual(expectOutputCreateAccount);
    expect(repository.create).toHaveBeenCalled();
  });

  it('should return true for existing id', async () => {
    jest.spyOn(repository, 'login').mockResolvedValue(1);
    const idAccount = await service.login(1);

    expect(idAccount).toBe(1);
    expect(repository.login).toHaveBeenCalled();
  });

  it('should return false for a not existing id', async () => {
    jest.spyOn(repository, 'login').mockResolvedValue(0);
    const idAccount = await service.login(2);

    expect(idAccount).toBe(0);
    expect(repository.login).toHaveBeenCalled();
  });

  it('should return null when delete an account', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(null);
    const expectedOutput = null;
    const output = await service.delete(1);

    expect(output).toEqual(expectedOutput);
    expect(repository.delete).toHaveBeenCalled();
  });

  it('should be update an account', async () => {
    jest.spyOn(repository, 'update').mockResolvedValue(null);
    const updateDTO = createAGenericAccountDTO('update') as UpdateAccountDto;
    const expectedOutput = null;
    const output = await service.update(updateDTO);
    expect(output).toEqual(expectedOutput);
    expect(repository.update).toHaveBeenCalled();
  });
});

function createAGenericAccountDTO(
  typeReturn: 'create' | 'update',
): CreateAccountDto | UpdateAccountDto {
  let accountDto: CreateAccountDto | UpdateAccountDto;

  switch (typeReturn) {
    case 'create':
      accountDto = new CreateAccountDto();
      accountDto.email = faker.internet.email();
      accountDto.name = faker.internet.displayName();
      accountDto.password = faker.internet.password();
      break;

    case 'update':
      accountDto = new UpdateAccountDto({
        id: 1,
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.internet.displayName(),
      });
      break;

    default:
      accountDto = new CreateAccountDto();
      accountDto.email = faker.internet.email();
      accountDto.name = faker.internet.displayName();
      accountDto.password = faker.internet.password();
      break;
  }
  return accountDto;
}

function createEntityFromDto(dto: CreateAccountDto): AccountEntity {
  const accountEntity = new AccountEntity();
  Object.assign(accountEntity, dto);
  return accountEntity;
}
