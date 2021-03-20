import { ApiProperty } from '@nestjs/swagger';

export class NameDto {
  @ApiProperty()
  name: string;
}
