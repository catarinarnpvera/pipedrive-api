import { ApiProperty } from '@nestjs/swagger';

export class childrenList {
  @ApiProperty()
  orgName: string;

  @ApiProperty()
  children: childrenList[];
}

export class postDataRequestDto {
  @ApiProperty()
  orgName: string;

  @ApiProperty({ type: [childrenList] })
  children: childrenList[];
}

//{ type: [postDataRequestDto] }
