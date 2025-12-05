import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GenerateImageDto } from './dto/generate-image.dto';

@Injectable()
export class GenerateService {
  private readonly logger = new Logger(GenerateService.name);
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('MJ_API_KEY');
    this.apiUrl = this.configService.get<string>('MJ_API_URL') || 'https://api.midjourney.com/v1';
  }

  async generate(dto: GenerateImageDto) {
    this.logger.log(`Generating image with prompt: "${dto.prompt.substring(0, 50)}..."`);

    try {
      const payload = this.buildPayload(dto);
      
      const response = await firstValueFrom(
        this.httpService.post(`${this.apiUrl}/imagine`, payload, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }),
      );

      this.logger.log(`Job created: ${response.data.jobId}`);

      return {
        jobId: response.data.jobId || `job_${Date.now()}`,
        status: response.data.status || 'queued',
        prompt: dto.prompt,
        seed: dto.seed,
        stylize: dto.stylize,
        createdAt: new Date().toISOString(),
        estimatedTime: response.data.estimatedTime || 60,
      };
    } catch (error) {
      this.logger.error(`Failed to generate: ${error.message}`, error.stack);
      throw new HttpException(
        `Midjourney API error: ${error.response?.data?.message || error.message}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStatus(jobId: string) {
    this.logger.log(`Fetching status for job: ${jobId}`);

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/jobs/${jobId}`, {
          headers: { 'Authorization': `Bearer ${this.apiKey}` },
          timeout: 10000,
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Failed to get status: ${error.message}`);
      throw new HttpException(
        `Failed to fetch job status: ${error.message}`,
        error.response?.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  private buildPayload(dto: GenerateImageDto) {
    const payload: any = { prompt: dto.prompt };
    
    if (dto.seed !== undefined) payload.seed = dto.seed;
    if (dto.stylize !== undefined) payload.stylize = dto.stylize;
    
    return payload;
  }
}
