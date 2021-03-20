import { ApiProperty } from '@nestjs/swagger';

export class OrganizationDataRequestDto {
  @ApiProperty()
  orgName: string;

  @ApiProperty()
  children: OrganizationDataRequestDto[];
}
