import { Test, TestingModule } from '@nestjs/testing';
import { ExpendituresController } from './expenditures.controller';

describe('ExpenditureController', () => {
  let controller: ExpendituresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpendituresController],
    }).compile();

    controller = module.get<ExpendituresController>(ExpendituresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
