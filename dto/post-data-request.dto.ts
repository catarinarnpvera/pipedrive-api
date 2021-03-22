import { ApiProperty } from '@nestjs/swagger';

export class childrenList {
  @ApiProperty()
  orgName: string;

  @ApiProperty()
  children: childrenList[];
}

export class PostDataRequestDto {
  @ApiProperty()
  orgName: string;

  @ApiProperty({ type: [childrenList] })
  children: childrenList[];
}

//{ type: [PostDataRequestDto] }
