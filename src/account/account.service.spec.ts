import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountEntity } from './entities/account.entity';
import { AccountRepository } from './repositories/account.repository';
import { PrismaService } from '../prisma/prisma.service';

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
            create: jest.fn().mockReturnValue(createEntityFromDto(createAGenericAccountDTO())),
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
    const newAccount = await service.create(dto);
    expect(newAccount).toEqual(expectOutputCreateAccount);
    expect(repository.create).toHaveBeenCalled();
  });
});

function createAGenericAccountDTO(): CreateAccountDto {
  const accoutDTO = new CreateAccountDto();
  accoutDTO.email = 'teste@gmail.com';
  accoutDTO.name = 'teste';
  accoutDTO.password = 'teste';
  return accoutDTO;
}

function createEntityFromDto(dto: CreateAccountDto): AccountEntity{
  const accountEntity = new AccountEntity();
  accountEntity.password = dto.password;
  accountEntity.name = dto.name;
  accountEntity.email = dto.email;
  return accountEntity;
}
