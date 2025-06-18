import { HealthController } from '@backend/health/health.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(healthController.get()).toStrictEqual({ status: 'ok' });
    });
  });
});
