import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { GenerateModule } from '../generate/generate.module';

@Module({
  imports: [GenerateModule],
  controllers: [StatusController],
})
export class StatusModule {}
