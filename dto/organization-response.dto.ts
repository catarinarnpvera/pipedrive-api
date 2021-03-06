import { ApiProperty } from '@nestjs/swagger';

export class OrganizationResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  recordsInsertedOnOrganization: number;
}
