import { ApiProperty } from '@nestjs/swagger';

export class OrgRelationshipResponseDto {
  @ApiProperty()
  relationshipType: string;

  @ApiProperty()
  orgName: string;
}
