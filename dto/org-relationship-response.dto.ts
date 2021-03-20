import { ApiProperty } from '@nestjs/swagger';

export class OrgRelationshipResponseDto {
  @ApiProperty()
  relationship: string;

  @ApiProperty()
  orgName: string;
}
