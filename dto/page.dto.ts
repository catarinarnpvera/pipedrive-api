import { ApiProperty } from '@nestjs/swagger';

export class PageDto {
  @ApiProperty()
  page: number;
}
