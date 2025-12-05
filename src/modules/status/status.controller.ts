import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GenerateService } from '../generate/generate.service';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private readonly generateService: GenerateService) {}

  @Get(':jobId')
  @ApiOperation({ summary: 'Get job status and progress' })
  @ApiParam({ name: 'jobId', example: 'job_1234567890' })
  @ApiResponse({ 
    status: 200, 
    description: 'Job status retrieved',
    schema: {
      example: {
        jobId: 'job_1234567890',
        status: 'completed',
        progress: 100,
        imageUrl: 'https://cdn.midjourney.com/image.png',
        prompt: 'cyberpunk cityscape',
        completedAt: '2025-12-05T21:00:00Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async getStatus(@Param('jobId') jobId: string) {
    return this.generateService.getStatus(jobId);
  }
}
