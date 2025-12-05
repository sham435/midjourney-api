import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GenerateService } from './generate.service';
import { GenerateImageDto } from './dto/generate-image.dto';

@ApiTags('generate')
@Controller('generate')
export class GenerateController {
  constructor(private readonly generateService: GenerateService) {}

  @Post()
  @ApiOperation({ summary: 'Generate image from prompt' })
  async generate(@Body() dto: GenerateImageDto) {
    return this.generateService.generate(dto);
  }
}
