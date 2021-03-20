import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NameDto, OrgRelationshipResponseDto, PageDto } from 'dto';
import { OrganizationResponseDto } from 'dto/organization-response.dto';
import { OrganizationDataRequestDto } from 'dto/organization-data-request.dto';
import { AppService } from './app.service';

@ApiTags('organization')
@Controller('/organization')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:name/relationship')
  @ApiResponse({
    status: 200,
    description: 'Fetch an organization relationship',
    type: OrgRelationshipResponseDto,
  })
  // eslint-disable-next-line prettier/prettier
  getOrgRelationship(@Param() params: NameDto, @Query() query: PageDto): Promise<OrgRelationshipResponseDto[]> {
    const { name } = params;
    return this.appService.getOrgRelationship(name, query);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Post organizations',
    type: OrganizationResponseDto,
  })
  // eslint-disable-next-line prettier/prettier
  postOrganizations(@Body() body: OrganizationDataRequestDto): Promise<OrganizationResponseDto> {
    return this.appService.postOrganizations(body);
  }
}
