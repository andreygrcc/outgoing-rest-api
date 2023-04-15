import { Test, TestingModule } from '@nestjs/testing';
import { ExpendituresService } from './expenditures.service';

describe('ExpenditureService', () => {
  let service: ExpendituresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpendituresService],
    }).compile();

    service = module.get<ExpendituresService>(ExpendituresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
