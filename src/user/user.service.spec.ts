import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { UpdateUserDto } from './dto/update-user.dto';

describe('AccountService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user', async () => {
    const dto = createAGenericUserDTO('create') as CreateUserDto;
    const expectOutputCreateAccount = createEntityFromDto(dto);

    jest
      .spyOn(repository, 'create')
      .mockResolvedValue(expectOutputCreateAccount);

    const newAccount = await service.create(dto);
    expect(newAccount).toEqual(expectOutputCreateAccount);
    expect(newAccount.password).toEqual(dto.password);
    expect(repository.create).toHaveBeenCalled();
  });

  it('should return null when delete an user', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(null);
    const expectedOutput = null;
    const output = await service.delete(1);

    expect(output).toEqual(expectedOutput);
    expect(repository.delete).toHaveBeenCalled();
  });

  it('should be update an user', async () => {
    jest.spyOn(repository, 'update').mockResolvedValue(null);
    const updateDTO = createAGenericUserDTO('update') as UpdateUserDto;
    const expectedOutput = null;
    const output = await service.update(updateDTO);
    expect(output).toEqual(expectedOutput);
    expect(repository.update).toHaveBeenCalled();
  });
});

function createAGenericUserDTO(
  typeReturn: 'create' | 'update',
): CreateUserDto | UpdateUserDto {
  let userDto: CreateUserDto | UpdateUserDto;

  switch (typeReturn) {
    case 'create':
      userDto = new CreateUserDto();
      userDto.email = faker.internet.email();
      userDto.name = faker.internet.displayName();
      userDto.password = faker.internet.password();
      break;

    case 'update':
      userDto = new UpdateUserDto({
        id: 1,
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.internet.displayName(),
      });
      break;

    default:
      userDto = new CreateUserDto();
      userDto.email = faker.internet.email();
      userDto.name = faker.internet.displayName();
      userDto.password = faker.internet.password();
      break;
  }
  return userDto;
}

function createEntityFromDto(dto: CreateUserDto): UserEntity {
  const userEntity = new UserEntity();
  Object.assign(userEntity, dto);
  return userEntity;
}
