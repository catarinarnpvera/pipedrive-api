import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('organization')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/organization')
  getHello(): string {
    return this.appService.getHello();
  }
}
