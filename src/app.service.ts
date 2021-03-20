import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  OrganizationDataRequestDto,
  OrganizationResponseDto,
  OrgRelationshipResponseDto,
  PageDto,
} from 'dto';
import { OrganizationEntity } from 'entities/orgarization.entity';
import { OrganizationRepository } from 'repositories/organization.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(OrganizationRepository)
    private organizationRepository: OrganizationRepository,
  ) {}
  // eslint-disable-next-line prettier/prettier
  async getOrgRelationship(name: string, pagination: PageDto): Promise<OrgRelationshipResponseDto[]> {

    const organization = await this.checkExistingOrg(name);
    console.log(
      '🚀 ~ file: app.service.ts ~ line 10 ~ AppService ~ getOrgRelationship ~ organization',
      organization,
    );

    const res = [
      {
        relationship: 'parent',
        orgName: 'Banana tree',
      },
      {
        relationship: 'parent',
        orgName: 'Big banana tree',
      },
    ];
    return res;
  }

  async checkExistingOrg(name: string): Promise<OrganizationEntity> {
    const existingOrg = await this.organizationRepository.findByName(name);
    console.log(
      '🚀 ~ file: app.service.ts ~ line 34 ~ AppService ~ checkExistingOrg ~ existingOrg',
      existingOrg,
    );
    if (!existingOrg) {
      throw new NotFoundException('Unkown organization name');
    }
    return existingOrg;
  }

  // eslint-disable-next-line prettier/prettier
  async postOrganizations(orgBody: OrganizationDataRequestDto): Promise<OrganizationResponseDto> {
    // const Body = {
    //   "orgName": "Paradise Island",
    //   "children": [
    //     {
    //       "orgName": "Banana tree",
    //       "children": [
    //         {
    //           "orgName": "Yellow Banana"
    //         },
    //         {
    //           "orgName": "Brown Banana"
    //         },
    //         {
    //           "orgName": "Black Banana"
    //         }
    //       ]
    //     }
    //   ]
    // }

    const relations = this.getRelations(orgBody.orgName, orgBody.children);
    console.log("🚀 ~ file: app.service.ts ~ line 74 ~ AppService ~ postOrganizations ~ relation", relations)
    const orgNames = this.getOrgNames(relations);
    console.log("🚀 ~ file: app.service.ts ~ line 74 ~ AppService ~ postOrganizations ~ orgNames", orgNames)

    // eslint-disable-next-line prettier/prettier
    const postOrg = await this.organizationRepository.postOrgData(orgNames, relations);
    console.log("🚀 ~ file: app.service.ts ~ line 80 ~ AppService ~ postOrganizations ~ postOrg", postOrg)

    return postOrg;
  }

  getRelations(orgName, children) {
    let orgRelations = [];

    children.forEach((child) => { // for
      orgRelations.push({
        childName: child.orgName,
        parentName: orgName,
      });
      if (child.children) {
        const cenas = this.getRelations(child.orgName, child.children);
        orgRelations = orgRelations.concat(cenas);
      }
    });

    return orgRelations;
  }

  getOrgNames(relations) {
    const orgNames = [];

    relations.forEach((child) => { // for
      // eslint-disable-next-line prettier/prettier
      //   orgNames.push({ orgName: child.childName });
      //   orgNames.push({ orgName: child.parentName });
      if (!(orgNames.filter(e => e.orgName === child.childName).length > 0)) {
        orgNames.push({ orgName: child.childName });
      }
      if(!(orgNames.filter(e => e.orgName === child.parentName).length > 0)){
        orgNames.push({ orgName: child.parentName });
      }
    });

    // orgNames = [...new Set(orgNames).keys()];

    return orgNames;
  }
}
