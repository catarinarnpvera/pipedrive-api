import { ApiProperty } from '@nestjs/swagger';

export class postResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  recordsInsertedOnOrganization: number;

  @ApiProperty()
  recordsInsertedOnRelationship: number;
}
