import { ApiProperty } from '@nestjs/swagger';

export class childrenList {
  @ApiProperty()
  orgName: string;

  @ApiProperty({ required: false })
  children: childrenList[];
}

export class PostDataRequestDto {
  @ApiProperty()
  orgName: string;

  @ApiProperty({ type: [childrenList], required: false })
  children: childrenList[];
}
