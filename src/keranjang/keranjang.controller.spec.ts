import { Test, TestingModule } from '@nestjs/testing';
import { KeranjangController } from './keranjang.controller';

describe('KeranjangController', () => {
  let controller: KeranjangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeranjangController],
    }).compile();

    controller = module.get<KeranjangController>(KeranjangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
