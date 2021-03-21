import { ApiProperty } from '@nestjs/swagger';

export class RelationshipResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  recordsInsertedOnRelationship: number;
}
